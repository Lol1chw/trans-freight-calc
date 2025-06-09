<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui'
import { RadioGroupRoot } from 'reka-ui'

type TabsProps = {
  class?: string
}

const props = defineProps<TabsProps>()
const modelValue = defineModel<AcceptableValue>()
</script>

<template>
  <radio-group-root v-model="modelValue" :class="props.class">
    <slot />
  </radio-group-root>
</template>
