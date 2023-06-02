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
import { useFloating, flip, shift, offset, autoUpdate, Middleware } from '@floating-ui/vue';

import { Props } from './Wowerlay.constants';
import { NOOP, isElement } from '../utils';
import { attrs, syncSize } from './Wowerlay.middlewares';

export const Wowerlay = defineComponent({
  name: 'Wowerlay',
  inheritAttrs: false,
  props: Props,
  emits: {
    'update:visible': null! as (value: boolean) => void,
    'update:el': null! as (value: HTMLElement | null) => void,
  },
  setup(props, { emit }) {
    const popoverEl = shallowRef<HTMLDivElement | null>(null);
    const backgroundEl = shallowRef<HTMLElement | null>();

    const { floatingStyles } = useFloating(
      toRef(props, 'target'), //
      popoverEl,
      {
        placement: toRef(props, 'position'),
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

          return middlewares;
        }),
      },
    );

    watch(popoverEl, (el) => {
      emit('update:el', el);
    });

    const popoverClosable = ref(false);
    const popoverVisible = computed(() => isElement(props.target) && props.visible);

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
        !(props.target instanceof HTMLElement) ||
        !(e.target instanceof HTMLElement) ||
        // Some people (like us in Wope) don't want to use `event.stopPropagation()` to prevent Wowerlay closing
        // Because it blocks following analytics or other events that rely on click.
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
      if (scopeEl && !scopeEl.contains(props.target)) {
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

    /**
     * This variable is for watching Popover's animation state.
     * When we unmount popover if user passed a transition we need to wait
     * for transition to end to hide Popover.
     *
     * When popover animation ends this variable will hide background.
     */
    const backgroundVisible = ref(props.visible);

    /**
     * Hides background element (so popover) when Popover animation ends.
     */
    const handleContentTransitionEnd = () => {
      backgroundVisible.value = false;
    };

    watch(
      () => props.visible,
      (state) => {
        if (state) {
          // We need to prevent closing popover in the same event loop because
          // If users clicks a button and changes visible to true
          // Wowerlay will be opened but same click event may be triggered on window
          // due to bubbling so it will be cached by our Window:click listener.
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
      // We need to wait for FloatingUI to calculate Popover position
      // If we run this function immediately, it will run before FloatingUI calculations
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
    const popover = this.popoverVisible ? (
      <div
        class="wowerlay"
        data-wowerlay-scope
        ref="popoverEl"
        style={this.floatingStyles}
        {...this.$attrs}
      >
        {this.$slots.default?.()}
      </div>
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
