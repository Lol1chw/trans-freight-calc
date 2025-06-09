<script setup lang="ts">
import { SwitchRoot, SwitchThumb } from 'reka-ui'

const modelValue = defineModel<boolean>()
</script>

<template>
  <switch-root
    id="airplane-mode"
    v-model="modelValue"
    class="SwitchRoot"
  >
    <switch-thumb
      class="SwitchThumb"
    />
  </switch-root>
</template>

<style lang="css" module>

</style>
