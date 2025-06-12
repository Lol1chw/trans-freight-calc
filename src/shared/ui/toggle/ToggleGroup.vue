<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui'
import { ToggleGroupRoot } from 'reka-ui'

type ToggleGroupProps = {
  asChild?: boolean
}

defineProps<ToggleGroupProps>()
const modelValue = defineModel<AcceptableValue>()
</script>

<template>
  <toggle-group-root v-model="modelValue" :as-child="asChild" type="single">
    <slot />
  </toggle-group-root>
</template>
