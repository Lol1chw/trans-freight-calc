<script setup lang="ts">
import { BaseCard } from '@/shared/ui/card'
import { InputGroup } from '@/shared/ui/input-group'
import { NumberInput } from '@/shared/ui/number-input'
import { BaseSelect } from '@/shared/ui/select'
import CargoTabs from './CargoTabs.vue'
import type { CargoType } from '@/shared/types/cargo'

const cargoTypes: CargoType[] = ['Коробки/Палеты']
const cargoTypeModel = defineModel<CargoType>('cargo-type', { required: true })
const cargoCountModel = defineModel<number>('cargo-count', { required: true })
const cargoWeightModel = defineModel<string>('cargo-weight', { required: true })
const cargoWeightTypeModel = defineModel<'KG'>('cargo-weight-type', { required: true })
</script>

<template>
  <base-card :class="$style['cargo-card']">
    <div :class="$style['cargo-card__content-grid']">
      <div :class="$style['cargo-card__section-header']">
        <span>Груз</span>
      </div>

        <div :class="$style['cargo-card__section-calculate']">
          <cargo-tabs v-model="cargoTypeModel" :cargo-types="cargoTypes" />

          <div :class="$style['section-calculate__wrapper']">
            <div :class="$style['section-calculate__input-wrapper']">
              <label :class="$style['section-calculate__label']">Количество (шт)</label>
              <number-input v-model="cargoCountModel" />
            </div>
          </div>

          <div :class="$style['section-calculate__container-weight']">
            <label :class="$style['section-calculate__label']">Вес</label>
            <input-group v-model="cargoWeightModel">
              <base-select v-model="cargoWeightTypeModel" :options="['KG']" default-value="KG" :class-trigger="$style.select" />
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
