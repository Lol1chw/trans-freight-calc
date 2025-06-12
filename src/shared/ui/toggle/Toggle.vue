<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui'
import { ToggleGroupItem } from 'reka-ui'

type ToggleProps = {
  value: AcceptableValue
}

defineProps<ToggleProps>()
</script>

<template>
  <toggle-group-item :value="value" :class="$style.toggle">
    <span :class="$style.toggle__text">
      <slot />
    </span>
  </toggle-group-item>
</template>

<style lang="css" module>
.toggle {
  background-color: var(--backgrond-secondary);
  border: 1px solid var(--white);
  border-radius: 4px;
  font-family: 'Inter';
  font-weight: 500;
  padding: 10px;
  cursor: pointer;
}

.toggle__text {
  color: var(--white);
  opacity: 0.5;
}

.toggle[data-state='on'] .toggle__text{
  color: #5BC0F2;
  opacity: 1;
}

.toggle[data-state='on'] {
  border-color: #5BC0F2;
}
</style>
