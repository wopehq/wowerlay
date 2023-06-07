import {
  Teleport,
  Transition,
  computed,
  defineComponent,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  toRef,
  watch,
} from 'vue';
import {
  useFloating,
  flip,
  shift,
  offset,
  autoUpdate,
  type Middleware,
  type Side,
} from '@floating-ui/vue';

import { Props } from './Wowerlay.constants';
import { NOOP, isElement, isValidTarget } from '../utils';
import { attrs, syncSize } from './Wowerlay.middlewares';

export interface WowerlayTemplateRef {
  update(): void;
}

export const Wowerlay = defineComponent({
  name: 'Wowerlay',
  inheritAttrs: false,
  props: Props,
  emits: {
    'update:visible': null! as (value: boolean) => void,
    'update:el': null! as (value: HTMLElement | null) => void,
  },
  setup(props, { emit, expose }) {
    const popoverEl = shallowRef<HTMLDivElement | null>(null);
    const backgroundEl = shallowRef<HTMLElement | null>();

    const { floatingStyles, update: updatePopover } = useFloating(
      toRef(props, 'target'),
      popoverEl,
      {
        placement: computed(() => {
          // If syncSize is true, we need to use only side of the position
          if (props.syncSize) return props.position.split('-')[0] as Side;

          return props.position;
        }),
        open: computed(() => props.visible),
        strategy: 'fixed',
        // If we use transform: true, animation that uses transform property will be broken.
        transform: false,
        whileElementsMounted(target, popover, update) {
          if (props.fixed) {
            update();
            return NOOP;
          }

          return autoUpdate(target, popover, update, {
            ancestorResize: true,
            ancestorScroll: true,
            elementResize: true,
          });
        },
        middleware: computed<Middleware[]>(() => {
          const middlewares = [attrs()] as Middleware[];

          if (typeof props.gap === 'number' && props.gap !== 0) middlewares.push(offset(props.gap));
          if (!props.noFlip) middlewares.push(flip());
          if (props.syncSize) middlewares.push(syncSize());
          if (!props.canLeaveViewport) middlewares.push(shift({ crossAxis: true }));

          return middlewares.concat(props.middlewares || []);
        }),
      },
    );

    expose({
      update: updatePopover,
    } as WowerlayTemplateRef);

    watch(popoverEl, (el) => {
      emit('update:el', el);
    });

    const popoverClosable = ref(false);
    const popoverVisible = computed(() => isValidTarget(props.target) && props.visible);

    const close = () => {
      if (!props.visible) return;

      if (popoverClosable.value) {
        emit('update:visible', false);
      }
    };

    onBeforeUnmount(close);

    const handleWindowClick = (e: MouseEvent) => {
      if (
        !props.visible ||
        !isValidTarget(props.target) ||
        !(e.target instanceof HTMLElement) ||
        // If we use "e.stopPropagation" to prevent closing, Analytics or other events that rely on click will be blocked.
        // If clicked element or it's ancestors has this attribute, Wowerlay doesn't close.
        e.target.closest('[data-wowerlay-stop]')
      ) {
        return;
      }

      // If clicked element or any ancestors has scope attribute we only
      // close popovers attached to elements in the target scope.
      // @See Demo/Nested and click the child Wowerlay body, it won't close parent Wowerlay
      // because each Wowerlay popover is a new scope.
      const scopeEl = e.target.closest('[data-wowerlay-scope]');
      if (scopeEl && isElement(props.target) && !scopeEl.contains(props.target)) {
        return;
      }

      // If a Wowerlay background is clicked but it isn't our background, prevents close.
      // This enables nested Wowerlays to work properly
      // @see Demo/Nested
      if (e.target.matches('[data-wowerlay-background]') && e.target !== backgroundEl.value) {
        return;
      }

      close();
    };

    onMounted(() => {
      window.addEventListener('click', handleWindowClick);
    });
    onBeforeUnmount(() => {
      window.removeEventListener('click', handleWindowClick);
    });

    const backgroundVisible = ref(props.visible);

    /** .
     * If popover has a background we rely on popover's transition state to
     * hide it with the background or not, otherwise leave transition will not be seen.
     */
    const handleContentTransitionEnd = () => {
      backgroundVisible.value = false;
    };

    watch(
      () => props.visible,
      (state) => {
        if (state) {
          // Use setTimeout to prevent immediate popover closure caused by the same click event due to event bubbling.
          // We listen to the window, so this ensures a single click doesn't simultaneously open and close the popover.
          setTimeout(() => {
            popoverClosable.value = true;
          }, 0);

          backgroundVisible.value = true;
        } else {
          popoverClosable.value = false;
        }
      },
    );

    const handleTransition = (type: 'enter' | 'leave', el: Element, done: () => void) => {
      // We need to wait for FloatingUI to update the position before we can transition.
      requestAnimationFrame(() => {
        if (typeof props.transition === 'function') props.transition(type, el as HTMLElement, done);
      });
    };

    return {
      handleContentTransitionEnd,
      floatingStyles,
      popoverVisible,
      backgroundEl,
      popoverEl,
      backgroundVisible,
      handleTransition,
    };
  },
  render() {
    const Tag = this.tag as /* for typechecking */ 'div';

    const popover = this.popoverVisible ? (
      <Tag
        class="wowerlay"
        data-wowerlay-scope
        ref="popoverEl"
        style={this.floatingStyles}
        {...this.$attrs}
      >
        {this.$slots.default?.()}
      </Tag>
    ) : null;

    let wowerlayContentToRender = (
      // onAfterLeave is called even if there is not animation
      <Transition onAfterLeave={this.handleContentTransitionEnd}>{popover}</Transition>
    );

    if (typeof this.transition === 'function') {
      const handleEnter = (el: Element, done: () => void) =>
        this.handleTransition('enter', el, done);

      const handleLeave = (el: Element, done: () => void) =>
        this.handleTransition('leave', el, done);

      wowerlayContentToRender = (
        <Transition
          appear
          onAppear={handleEnter}
          onEnter={handleEnter}
          onLeave={handleLeave}
          onAfterLeave={this.handleContentTransitionEnd}
        >
          {popover}
        </Transition>
      );
    } else if (typeof this.transition === 'string') {
      wowerlayContentToRender = (
        <Transition appear onAfterLeave={this.handleContentTransitionEnd} name={this.transition}>
          {popover}
        </Transition>
      );
    }

    const backgroundAttrsClone = Object.assign(Object.create(null), this.backgroundAttrs);
    delete backgroundAttrsClone.key;

    return (
      <Teleport to="body">
        {(() => {
          if (this.noBackground) return wowerlayContentToRender;

          if (this.backgroundVisible) {
            return (
              <div
                data-wowerlay-background
                class="wowerlay-background"
                role="dialog"
                ref="backgroundEl"
                {...backgroundAttrsClone}
              >
                {wowerlayContentToRender}
              </div>
            );
          }

          return null;
        })()}
      </Teleport>
    );
  },
});
