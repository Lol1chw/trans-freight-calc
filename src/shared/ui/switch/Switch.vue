<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'reka-ui'

type BaseSwitchProps = {
  id?: string
}

defineProps<BaseSwitchProps>()
const modelValue = defineModel<boolean>({ required: true })
</script>

<template>
  <switch-root
    :id="id"
    v-model="modelValue"
    :class="$style['switch-root']"
  >
    <switch-thumb
      :class="$style['switch-thumb']"
    />
  </switch-root>
</template>

<style lang="css" module>
.switch-root {
  background-color: var(--background-primary);
  min-width: 42px;
  height: 25px;
  border-radius: 9999px;
  position: relative;
  border: none;
  cursor: pointer;
}

.switch-root[data-state='checked'] {
  background-color: #5BC0F2;
}

.switch-thumb {
  display: block;
  width: 21px;
  height: 21px;
  background-color: var(--background-secondary);
  border-radius: 9999px;
  transition: transform 0.125s ease-in-out;
}

.switch-thumb[data-state='checked'] {
  background-color: var(--white);
  transform: translateX(19px);
}
</style>
