import { Middleware } from '@floating-ui/vue';

export const syncSize = (): Middleware => ({
  name: 'wowerlay:syncBounds',
  fn({ placement, elements }) {
    const target = elements.reference as HTMLElement;
    const popover = elements.floating as HTMLElement;

    if (placement.startsWith('left') || placement.startsWith('right')) {
      popover.style.setProperty('height', `${target.offsetHeight}px`);
    } else if (placement.startsWith('top') || placement.startsWith('bottom')) {
      popover.style.setProperty('width', `${target.offsetWidth}px`);
    }

    return {};
  },
});

export const attrs = (): Middleware => ({
  name: 'wowerlay:attr',
  fn({ placement, elements, x, y, rects }) {
    elements.floating.setAttribute('data-popover-placement', placement);
    elements.floating.setAttribute('data-popover-x', x.toString());
    elements.floating.setAttribute('data-popover-y', y.toString());
    elements.floating.setAttribute('data-popover-rect', JSON.stringify(rects.floating));

    return {};
  },
});
