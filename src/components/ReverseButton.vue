<script setup lang="ts">
import { MoveHorizontal } from 'lucide-vue-next'

type ReverseButtonEmits = {
  (event: 'click'): void
}

defineEmits<ReverseButtonEmits>()
</script>

<template>
  <button :class="$style.button" @click="$emit('click')">
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
}

.button__icon {
  transform: rotate(90deg);
}

@media screen and (min-width: 768px) {
  .button__icon {
    transform: none;
  }
}
</style>
