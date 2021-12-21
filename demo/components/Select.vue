<script lang="ts" setup>
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/vue';
import ChevronDown from 'virtual:icons/mdi/chevron-down';
import ChevronUp from 'virtual:icons/mdi/chevron-up';
import Button from './Button.vue';

interface Props {
  data: Record<string, any>;
  modelValue: any;
}
interface Emits {
  (e: 'update:modelValue', v: any): void;
}
const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const handleUpdateValue = (value: any) => {
  emit('update:modelValue', value);
};
</script>

<template>
  <Listbox v-slot="{ open }" :modelValue="props.modelValue" @update:modelValue="handleUpdateValue">
    <span class="menu">
      <ListboxButton class="menu-button">
        <Button outline>
          {{ props.data[props.modelValue] || 'Choose' }}
          <ChevronUp v-if="open" class="menu-icon" />
          <ChevronDown v-else class="menu-icon" />
        </Button>
      </ListboxButton>
      <ListboxOptions class="menu-items">
        <ListboxOption
          v-slot="{ active, selected }"
          class="menu-item"
          :key="value"
          :value="value"
          v-for="(displayValue, value) in props.data"
          as="template"
        >
          <span :class="{ active, selected }">
            {{ displayValue }}
          </span>
        </ListboxOption>
      </ListboxOptions>
    </span>
  </Listbox>
</template>

<style lang="scss" scoped>
.menu {
  @apply relative;
  .menu-icon {
    @apply text-size-18px ml-2 my-[-3px];
  }

  .menu-button {
    @apply inline-block bg-transparent p-0 m-0;
  }
  .menu-items {
    @apply z-20 list-none absolute block left-[50%] transform outline-none translate-x-[-50%] py-1 mt-1 overflow-auto text-base bg-secondary rounded-md shadow-lg max-h-75;
    padding-inline-start: 0px;
    .menu-item {
      @apply p-2 mx-2 text-left block text-white cursor-default whitespace-nowrap hover:bg-dark-800;
      &.active {
        @apply text-accent;
      }

      &.selected {
        @apply bg-accent text-secondary rounded-sm font-bold;
      }
    }
  }
}
</style>
