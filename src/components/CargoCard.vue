<script setup lang="ts">
import type { CargoType } from '@/shared/types/cargo'
import { clsx } from 'clsx'
import { BaseCard } from '@/shared/ui/card'
import { InputGroup } from '@/shared/ui/input-group'
import { NumberInput } from '@/shared/ui/number-input'
import { BaseSelect } from '@/shared/ui/select'

import CargoTabs from './CargoTabs.vue'
import { useI18n } from 'vue-i18n'

import type { I18nMessagesSchema } from '@/shared/types/i18n'

const { tm } = useI18n<{ message: I18nMessagesSchema }>()

const cargoTypeModel = defineModel<CargoType>('cargo-type', { required: true })
const cargoVolumeCBMModel = defineModel<number>('cargo-volume', { required: true })
const cargoWeightModel = defineModel<number>('cargo-weight', { required: true })
const cargoWeightTypeModel = defineModel<'KG'>('cargo-weight-type', { required: true })
</script>

<template>
  <base-card :class="$style['cargo-card']">
    <div :class="$style['cargo-card__content-grid']">
      <div :class="$style['cargo-card__section-header']">
        <span>{{ $t('cargoCard.title') }}</span>
      </div>

      <div :class="$style['cargo-card__section-calculate']">
        <cargo-tabs v-model="cargoTypeModel" :cargo-types="tm('cargoTabs.cargoTypes')" />
        <div :class="$style['section-calculate__wrapper']">
          <div :class="$style['section-calculate__input-wrapper']">
            <label :class="$style['section-calculate__label']">{{ $t('cargoCard.volume') }}</label>
            <number-input v-model="cargoVolumeCBMModel" :min="1" />
          </div>
        </div>

        <div :class="$style['section-calculate__container-weight']">
          <label :class="$style['section-calculate__label']">{{ $t('cargoCard.weight') }}</label>
          <input-group v-model="cargoWeightModel" :min="500">
            <base-select v-model="cargoWeightTypeModel" disabled :options="['KG']" default-value="KG" :class-trigger="clsx($style.select, $style['select--disabled'])" />
          </input-group>
        </div>
      </div>
    </div>
  </base-card>
</template>

<style lang="css" module>
.select {
  border-left: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  max-width: 60px;
}

.select--disabled {
  background-color: #2d3a42;
  opacity: 0.5;
}

.cargo-card {
  width: 100%;
  border-radius: 12px;
  padding: 24px;
}

.cargo-card__content-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50px auto;
}

.cargo-card__section-header {
  margin-bottom: 20px;
}

.cargo-card__section-calculate {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: end;
  gap: 10px;
}

.section-calculate__wrapper {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  max-width: 500px;
  gap: 10px;
}

.section-calculate__input-wrapper {
  flex: 1 1 104px;
  min-width: 104px;
  max-width: 200px;
}

.section-calculate__label {
  color: var(--primary);
  font-size: 10px;
  font-family: 'Inter';
}

.section-calculate__container-weight {
  width: 100%;
  max-width: 200px;
}

@media screen and (max-width: 320px) {
  .section-calculate__wrapper {
    display: flex;
    justify-content: space-between;
  }
}

@media screen and (min-width: 600px) {
  .section-calculate__label {
    font-size: 12px;
  }
}
</style>
