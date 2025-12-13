<script setup lang="ts">
import type { I18nMessagesSchema } from '@/shared/types/i18n'
import { TabItem, Tabs } from '@/shared/ui/tabs'

type CargoTabsProps = {
  cargoTypes: I18nMessagesSchema['cargoTabs']['cargoTypes']
}

defineProps<CargoTabsProps>()
const modelValue = defineModel<string>({ required: true })
</script>

<template>
  <tabs v-model="modelValue" class="radio-group">
    <template v-for="cargoType in cargoTypes" :key="cargoType">
      <div>
        <tab-item :value="$rt(cargoType)" />
      </div>
    </template>
  </tabs>
</template>

<style lang="css" scoped>
.radio-group {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 100%;
  width: 100%;
  max-width: 200px;
}

.radio-group__button {
  width: 100%;
  min-height: 50px;
  font-size: 12px;
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
    grid-template-columns: 100%;
  }

  .radio-group > div:first-child .radio-group__button {
    border-radius: 8px 0 0 8px;
  }

  .radio-group > div:nth-child(odd):not(:first-child) .radio-group__button {
    border-radius: 0 8px 8px 0;
    border-left: none;
  }
}

.radio-group > div:only-child .radio-group__button {
  border-radius: 8px;
}
</style>
