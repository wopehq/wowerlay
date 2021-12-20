<script lang="ts" setup>
import { onMounted, shallowRef, watch } from 'vue';
import { useHighlight } from '../helpers/highlight';

interface Props {
  code: string;
  language: 'html' | 'javascript';
}
const props = defineProps<Props>();

const highlightedCode = shallowRef('');
const hljs = useHighlight();

const highlight = () => {
  highlightedCode.value = hljs.highlight(props.code, { language: props.language }).value;
};

watch(() => [props.code], highlight);
onMounted(highlight);
</script>

<template>
  <div class="highlight" v-if="props.code" v-html="highlightedCode" />
</template>

<style lang="scss" scoped>
.highlight,
.highlight * {
  @apply whitespace-pre text-left text-light-700 mx-3 font-code;
}
</style>
