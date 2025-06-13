<script setup lang="ts">
import { provide, ref, watch } from 'vue'
import { CargoCard, ReverseButton, ShipmentDirectionCard } from '@/components'
import { BaseCard } from '@/shared/ui/card'
import { BaseSwitch } from '@/shared/ui/switch'
import type { CargoType, ContainerSizeType } from '@/shared/types/cargo'
import { calculateShippingCost } from './components/const/calculate-routes'

const fromCFSCountry = ['Китай']
const toCFSCountry = ['Россия']
const fromCFS = ['Hefei', 'Suzhou', 'Chongqing-manzhouli', 'Xian-manzhouli', 'Xian-Khorgos/Alashankou', 'Chengdu-Khorgos/Alashankou']
const toCFS = ['Moscow', 'Saint Petersburg', 'Minsk', 'Kaliningrad']
const transportHubs = ['Город', 'Морской порт', 'Аэропорт', 'Ж/Д станция']

type ChinaCity = typeof fromCFS[number];
type RussiaCity = typeof toCFS[number];

type Country =
  | { from: 'Россия', to: 'Китай' }
  | { from: 'Китай', to: 'Россия' }

type TransportHub = { from: 'Город', to: 'Город' }

type City =
  | { from: RussiaCity, to: ChinaCity }
  | { from: ChinaCity, to: RussiaCity }


const country = ref<Country>({ from: 'Китай', to: 'Россия' })
const transportHub = ref<TransportHub>({ from: 'Город', to: 'Город' })
const city = ref<City>({ from: 'Hefei', to: 'Moscow' })
const cargoType = ref<CargoType>('Контейнеры')
const cargoCount = ref<number>(2000)
const cargoSize = ref<ContainerSizeType>('20’')
const cargoWeight = ref<number>(111)
const cargoWeightType = ref<'KG'>('KG')
const customsIncluded = ref<boolean>(false)
const isCargoInsured = ref<boolean>(false)
const isReversed = ref<boolean>(false)

const lastCityFrom = ref<string>('')
const lastCountryFrom = ref<'Россия' | 'Китай'>()

watch(transportHub.value, (transportHub) => {
  if (transportHub.from !== 'Город') {
    transportHub.from = 'Город'
  }

  if (transportHub.to !== 'Город') {
    transportHub.to = 'Город'
  }
})

watch(isReversed, () => {
  lastCityFrom.value = city.value.from
  lastCountryFrom.value = country.value.from

  city.value.from = city.value.to
  city.value.to = lastCityFrom.value

  country.value.from = country.value.to
  country.value.to = lastCountryFrom.value

}, { deep: true })

function handleReverseClick() {
  isReversed.value = !isReversed.value
}

function handleSumbitForm() {}
</script>

<template>
  <div :class="$style.calculator">
    <div :class="$style.calculator__title">
      Получите рассчет стоимости заказа
    </div>
    <form @submit="handleSumbitForm" :class="$style.form">
      <h1 :class="$style.form__title">
        Рассчитать перевозку онлайн
      </h1>
      <div :class="$style.form__wrapper">
        <div :class="$style['form__shipment-direction']">
          <shipment-direction-card
            ref="comp"
            v-model:city="city.from"
            v-model:transport-hub-selected="transportHub.from"
            v-model:country="country.from" direction="Откуда"
            direction-sub-label="Пункт назначения"
            :transport-hubs="transportHubs"
            :shipment-countries="!isReversed ? fromCFSCountry : toCFSCountry"
            :shipment-city="!isReversed ? fromCFS : toCFS"
          />

          <div :class="$style['shipment-direction__reverse-button']">
            <reverse-button @reverse-click="handleReverseClick"/>
          </div>

          <shipment-direction-card
            v-model:city="city.to"
            v-model:transport-hub-selected="transportHub.to"
            v-model:country="country.to"
            direction="Куда"
            direction-sub-label="Пункт направления"
            :transport-hubs="transportHubs"
            :shipment-countries="!isReversed ? toCFSCountry : fromCFSCountry"
            :shipment-city="!isReversed ? toCFS : fromCFS"
          />
        </div>

        <div :class="$style.form__cargo">
          <cargo-card
            v-model:cargo-size-type="cargoSize"
            v-model:cargo-count="cargoCount"
            v-model:cargo-type="cargoType"
            v-model:cargo-weight="cargoWeight"
            v-model:cargo-weight-type="cargoWeightType"
          />
        </div>

        <base-card :class="$style['form__switch-card']">
          <base-switch v-model="customsIncluded" id="Таможенное оформление" />
          <label for="Таможенное оформление" :class="$style['switch-card__label']">Таможенное оформление</label>
        </base-card>

        <base-card :class="$style['form__switch-card']">
          <base-switch v-model="isCargoInsured" id="Страхование груза" />
          <label for="Страхование груза" :class="$style['switch-card__label']">Страхование груза</label>
        </base-card>
      </div>
    </form>
  </div>
</template>

<style lang="css" module>
.calculator {
  padding: 12px;
}

.calculator__title {
  font-family: 'Inter';
  font-family: 500;
  font-size: 14px;
  padding-left: 12px;
  margin-bottom: 10px;
}

.form {
  padding: 12px;
  background-color: var(--color-background);
  border-radius: 12px;
}

.form__title {
  font-family: 'Inter';
  font-family: 500;
  font-size: 16px;
  max-width: 959px;
  margin: 0 auto;
  margin-bottom: 10px;
}

.form__wrapper {
  max-width: 959px;
  margin: 0 auto;
}

.form__shipment-direction {
  display: grid;
  justify-items: center;
  grid-template-columns: auto;
  grid-template-rows: 1fr;
  position: relative;
}

.shipment-direction__reverse-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 100px;
}

.form__cargo {
  display: grid;
  margin: 0 auto;
  justify-items: center;
  margin-bottom: 10px;
}

.form__switch-card {
  display: flex;
  gap: 15px;
  align-items: center;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 10px;
}

.switch-card__label {
  font-family: 'Inter';
  font-weight: 500;
  cursor: pointer;
}

@media screen and (min-width: 768px) {
  .form__shipment-direction {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    column-gap: 10px;
  }
}
</style>
