<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui'
import { TabItem, Tabs } from '@/shared/ui/tabs'

type TransportHubTabsProps = {
  transportHubs: string[]
}

defineProps<TransportHubTabsProps>()
const modelValue = defineModel<AcceptableValue>()
</script>

<template>
  <tabs v-model="modelValue" class="radio-group">
    <template v-for="(transportHub, index) in transportHubs" :key="transportHub">
      <div>
        <tab-item :value="transportHub" :disabled="index !== 0" />
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

@media screen and (max-width: 350px) {
    .radio-group > div:first-child .radio-group__button {
    border-radius: 8px 0 0 8px;
}

.radio-group > div:nth-child(even):not(:last-child) .radio-group__button {
    border-radius: 0 8px 8px 0;
    border-left: none;
}

.radio-group > div:nth-child(odd):not(:first-child) .radio-group__button {
    border-radius: 8px 0 0 8px;
    border-right: none;
}

.radio-group > div:nth-child(-n+2) .radio-group__button {
    margin-bottom: 4px;
}

/* Последний элемент - скругление справа */
.radio-group > div:last-child .radio-group__button {
    border-radius: 0 8px 8px 0;
}
}

@media screen and (min-width: 350px) {
    .radio-group {
        grid-template-columns: repeat(4, auto);
    }

    /* Первый элемент - скругление слева */
    .radio-group > div:first-child .radio-group__button {
        border-radius: 8px 0 0 8px;
    }

    /* Последний элемент - скругление справа */
    .radio-group > div:last-child .radio-group__button {
        border-radius: 0 8px 8px 0;
    }

    /* Каждый нечетный элемент (начиная с первого) - добавляем правую границу */
    .radio-group > div:nth-child(odd):not(:last-child):not(:first-child) .radio-group__button {
        border-right: 1px solid var(--white);
        border-left: none;
    }

    /* Каждый четный элемент (кроме последнего) - добавляем правую границу */
    .radio-group > div:nth-child(even) .radio-group__button {
        border-right: 1px solid var(--white);
        border-left: none;
    }
}
</style>
