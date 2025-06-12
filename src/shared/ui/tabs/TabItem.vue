<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui'
import { RadioGroupIndicator, RadioGroupItem } from 'reka-ui'

type TabItemProps = {
  value: AcceptableValue
  disabled?: boolean
}

defineProps<TabItemProps>()
</script>

<template>
  <radio-group-item :disabled="disabled" class="radio-group__button" :value="value">
    <radio-group-indicator />
    {{ value }}
  </radio-group-item>
</template>

<style lang="css" scoped>
.radio-group__button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  border: 1px solid var(--white);
  background-color: var(--background-secondary);
  color: var(--white);
  cursor: pointer;
  font-size: 8px;
  padding-inline: 14px;
  flex: 2;
  width: 100%;
}

.radio-group__button:hover {
  opacity: 0.8;
}

.radio-group__button:disabled{
  opacity: 0.7;
  cursor: not-allowed;
}

.radio-group__button[data-state="checked"] {
  background-color: #5BC0F2;
}

.radio-group__button:active {
  transform: translateY(-0.5px);
}

@media screen and (min-width: 600px) {
  .radio-group__button {
    font-size: 12px;
  }
}
</style>
