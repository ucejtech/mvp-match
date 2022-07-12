import { shallowMount } from '@vue/test-utils';
import BaseAvatar from '@/components/ui-components/_base-avatar.vue';

describe('@/components/ui-components/_base-avatar.vue', () => {
  it('renders correct background color when passed as props', () => {
    const bgColor = 'red';

    const { element } = shallowMount(BaseAvatar, {
      propsData: { color: bgColor }
    });

    expect(getComputedStyle(element).getPropertyValue('background-color')).toBe(
      bgColor
    );
  });

  it('renders correct text color when passed as props', () => {
    const textColor = 'black';

    const { element } = shallowMount(BaseAvatar, {
      propsData: { textColor }
    });

    expect(getComputedStyle(element).getPropertyValue('color')).toBe(textColor);
  });

  it('Renders default slot', () => {
    const slotContent = 'NDM';
    const { element } = shallowMount(BaseAvatar, {
      slots: {
        default: slotContent
      }
    });
    expect(element.innerHTML).toContain(slotContent);
  });
});
