import { ref } from 'vue';

export default () => {
  const targetEl = ref<HTMLElement>();
  const isOpen = ref(false);

  const handleVisibleChange = (state: boolean) => {
    isOpen.value = state;
  };
  const toggleVisible = () => {
    isOpen.value = !isOpen.value;
  };

  return {
    targetEl,
    isOpen,
    handleVisibleChange,
    toggleVisible,
  };
};
