<script setup lang="ts">
import { NumberFieldInput, NumberFieldRoot } from 'reka-ui'

type InputGroupProps = {
  min?: number
}

defineProps<InputGroupProps>()
const modelValue = defineModel<number>({ required: true })
</script>

<template>
  <div :class="$style['input-group']">
    <number-field-root v-model="modelValue" :min="min" :class="$style['number-input']">
      <number-field-input placeholder="Введите кол-во" :class="$style['input-group__input']" />
    </number-field-root>
    <slot />
  </div>
</template>

<style lang="css" module>
.input-group {
  display: flex;
}

.input-group__input {
  background-color: var(--background-secondary);
  color: var(--white);
  border: 1px solid var(--white);
  border-radius: 8px 0 0 8px;
  padding: 0 0 0 10px;
  width: 100%;
  height: 50px;
}

.input-group__input:focus-visible {
  border-color: #5BC0F2;
  outline: none;
}
</style>
