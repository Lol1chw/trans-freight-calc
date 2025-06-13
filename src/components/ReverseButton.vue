<script setup lang="ts">
import { MoveHorizontal } from 'lucide-vue-next'

type ReverseButtonEmits = {
  (event: 'reverse-click'): void
}

const emit = defineEmits<ReverseButtonEmits>()
</script>

<template>
  <button type="button" :class="$style.button" @click="emit('reverse-click')">
    <move-horizontal :class="$style.button__icon" color="#ffffff" stroke-width="1px" width="32px" height="32px" />
  </button>
</template>

<style lang="css" module>
.button {
    background-color: #5BC0F2;
    border-radius: 9999px;
    min-height: 44px;
    min-width: 44px;
    outline: none;
    border: none;
    cursor: pointer;
}

.button__icon {
  transform: rotate(90deg);
  pointer-events: none;
}

@media screen and (min-width: 768px) {
  .button__icon {
    transform: none;
  }
}
</style>
