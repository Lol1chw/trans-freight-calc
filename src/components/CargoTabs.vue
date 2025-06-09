<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui'
import { TabItem, Tabs } from '@/shared/ui/tabs'

type CargoTabsProps = {
  cargoTypes: string[]
}

defineProps<CargoTabsProps>()
const modelValue = defineModel<AcceptableValue>()
</script>

<template>
  <tabs v-model="modelValue">
    <template v-for="cargoType in cargoTypes" :key="cargoType">
      <div>
        <tab-item :value="cargoType" />
      </div>
    </template>
  </tabs>
</template>

<style lang="css" scoped>
.radio-group {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: repeat(2, auto);
}
</style>
