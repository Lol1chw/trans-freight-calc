<script setup lang="ts">
import { Primitive } from 'reka-ui'
</script>

<template>
  <div :class="$style['input-group']">
    <primitive as="input" :class="$style['input-group__input']" />
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
  padding: 0;
  width: 100%;
  height: 50px;
}

.input-group__input:focus-visible {
  border-color: #5BC0F2;
  outline: none;
}
</style>
