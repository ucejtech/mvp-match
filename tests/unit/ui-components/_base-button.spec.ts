import { shallowMount } from '@vue/test-utils';
import BaseButton from '@/components/ui-components/_base-button.vue';

describe('@/components/ui-components/_base-button.vue', () => {
  it('renders icon when showIcon props is true', () => {
    const wrapper = shallowMount(BaseButton, {
      propsData: { showIcon: true }
    });

    expect(wrapper.find('img').exists()).toBeTruthy();
  });

  it('does not render icon when showIcon props is false', () => {
    const wrapper = shallowMount(BaseButton, {
      propsData: { showIcon: false }
    });

    expect(wrapper.find('img').exists()).toBeFalsy();
  });

  it('Renders default slot', () => {
    const slotContent = 'Generate';
    const { element } = shallowMount(BaseButton, {
      slots: {
        default: slotContent
      }
    });
    expect(element.innerHTML).toContain(slotContent);
  });

  it('Button loads when loading is set to true', () => {
    const loadingText = '<span>Loading...</span>';
    const { element } = shallowMount(BaseButton, {
      propsData: {
        loading: true
      }
    });
    expect(element.innerHTML).toContain(loadingText);
  });

  it('Check if slot is removed when loading is triggered', () => {
    const slotContent = '<span>Generate </span>';
    const { element } = shallowMount(BaseButton, {
      propsData: {
        loading: true
      },
      slots: {
        default: slotContent
      }
    });
    expect(element.innerHTML).not.toContain(slotContent);
  });
});
