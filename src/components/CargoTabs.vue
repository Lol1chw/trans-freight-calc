<script setup lang="ts">
import { TabItem, Tabs } from '@/shared/ui/tabs'
import type { CargoType } from '@/shared/types/cargo';

type CargoTabsProps = {
  cargoTypes: string[]
}

defineProps<CargoTabsProps>()
const modelValue = defineModel<CargoType>({ required: true })
</script>

<template>
  <tabs v-model="modelValue" class="radio-group">
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
  grid-template-rows: 1fr;
  grid-template-columns: repeat(auto-fill, auto);
  max-width: 400px;
}

@media screen and (max-width: 300px) {
  .radio-group > div:first-child .radio-group__button {
    border-radius: 8px 8px 0 0;
  }

  .radio-group > div:nth-child(odd):not(:first-child) .radio-group__button {
    border-radius: 0 0 8px 8px;
  }
}

@media screen and (min-width: 300px) {
  .radio-group {
    grid-template-columns: repeat(3, auto);
  }

  .radio-group > div:first-child .radio-group__button {
    border-radius: 8px 0 0 8px;
  }

  .radio-group > div:nth-child(odd):not(:first-child) .radio-group__button {
    border-radius: 0 8px 8px 0;
    border-left: none;
  }
}
</style>
