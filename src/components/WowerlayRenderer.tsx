import { cWowerlay, sWowerlayX, sWowerlayY } from '../consts';
import { computed, defineComponent, onMounted, ref, watch } from 'vue';

import { useWowerlayContext } from '../event';
import { wowerlayBaseProps } from './WowerlayReusables';

enum Direction {
  Horizontal,
  Vertical
}

export const WowerlayRenderer = defineComponent({
  name: 'WowerlayRenderer',
  inheritAttrs: false,
  props: wowerlayBaseProps,
  setup(props) {
    const { onRecalculate } = useWowerlayContext();

    const overlayElement = ref<HTMLElement>();
    const posY = ref(0);
    const posX = ref(0);

    const Tag = computed(() => props.tag as 'div');
    const positionClassNames = computed<Record<string, string>>(() => ({
      [sWowerlayY]: posY.value + 'px',
      [sWowerlayX]: posX.value + 'px'
    }));

    const fixPosition = (pos: number, direction: Direction) => {
      // if wowerlay is not mounted, keep it out of view
      if (!overlayElement.value) return -1000;

      const { width, height } = overlayElement.value.getBoundingClientRect();
      // gap for edge of screen
      const edgeGap = 20;

      switch (direction) {
        case Direction.Horizontal: {
          const limitX = window.innerWidth - width - edgeGap;
          return Math.max(edgeGap, Math.min(limitX, pos));
        }

        case Direction.Vertical: {
          const limitY = window.innerHeight - height - edgeGap;
          return Math.max(edgeGap, Math.min(limitY, pos));
        }
      }
    };

    const handleOverlayClick = (e: MouseEvent) => {
      e.stopPropagation();
    };

    const updateOverlayPosition = () => {
      if (!props.target || !overlayElement.value) return;

      const { height, x: newX, y } = (props.target as HTMLElement).getBoundingClientRect();
      const newY = height + y;
      posY.value = fixPosition(newY, Direction.Vertical);
      posX.value = fixPosition(newX, Direction.Horizontal);
    };

    watch(
      () => props.target,
      (newTarget) => newTarget instanceof HTMLElement && updateOverlayPosition()
    );

    onRecalculate(() => {
      if (props.fixed) return;
      updateOverlayPosition();
    });
    onMounted(() => props.target instanceof HTMLElement && updateOverlayPosition());

    return {
      handleOverlayClick,
      overlayElement,
      positionClassNames,
      Tag
    };
  },
  render() {
    const Element = this.Tag;
    return (
      this.target && (
        <Element
          onClick={this.handleOverlayClick}
          ref="overlayElement"
          style={this.positionClassNames}
          class={cWowerlay}
          {...this.$attrs}
        >
          {this.$slots.default?.()}
        </Element>
      )
    );
  }
});
