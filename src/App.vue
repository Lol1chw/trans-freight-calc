<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { CargoCard, ShipmentDirectionCard, CalculateResultDialog } from '@/components'
import { BaseCard } from '@/shared/ui/card'
import { BaseSwitch } from '@/shared/ui/switch'
import { calculateShippingCost } from '@/components/const/calculate-routes'
import { ROUTES } from '@/components/const/calculate-routes'

import clsx from 'clsx'

import type { CargoType } from '@/shared/types/cargo'
import type { ShippingParams } from '@/components/const/calculate-routes'

const defaultValues = {
  from: 'Hefei',
  to: 'Moscow',
  cargoCount: 2,
  cargoWeight: '500',
  customsIncluded: false,
  isCargoInsured: false,
  cost: 0,
}
const fromCFSCountry = ['Китай']
const toCFSCountry = ['Россия']
const fromCFS = ['Hefei', 'Suzhou', 'Chongqing-manzhouli', "Xi'an-Manzhouli", 'Xian-Khorgos/Alashankou']
const toCFS = ['Moscow', 'Saint Petersburg', 'Kaliningrad']
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
const city = ref<City>({ from: defaultValues.from, to: defaultValues.to })
const cargoType = ref<CargoType>('Коробки/Палеты')
const cargoCount = ref<number>(defaultValues.cargoCount)
const cargoWeight = ref<string>(defaultValues.cargoWeight)
const cargoWeightType = ref<'KG'>('KG')
const customsIncluded = ref<boolean>(false)
const isCargoInsured = ref<boolean>(false)
const cost = ref<number>(0)

// Пример использования
const params = computed<ShippingParams>(() => {
  return {
    from: city.value.from,
    to: city.value.to,
    cargoType: cargoType.value,
    count: Number(cargoCount.value),
    weight: Number(cargoWeight.value),
    customsIncluded: customsIncluded.value,
    insurance: isCargoInsured.value
  }
})

watch(transportHub.value, (transportHub) => {
  if (transportHub.from !== 'Город') {
    transportHub.from = 'Город'
  }

  if (transportHub.to !== 'Город') {
    transportHub.to = 'Город'
  }
})

const filteredToCFS = ref<string[]>([])

watch(params, (params) => {
  if (params.from) {
    const filteredRoutesTo = ROUTES.filter((el) => el.from === params.from).flatMap((el) => el.to)
    filteredToCFS.value = filteredRoutesTo
    if (!filteredRoutesTo.includes(city.value.to)) {
      city.value.to = filteredRoutesTo[0]
    }
  }
}, { immediate: true })

function calculateReset() {
  city.value.from = defaultValues.from
  city.value.to = defaultValues.to
  cargoCount.value = defaultValues.cargoCount
  cargoWeight.value = defaultValues.cargoWeight
  customsIncluded.value = defaultValues.customsIncluded
  isCargoInsured.value = defaultValues.isCargoInsured
  cost.value = defaultValues.cost
}
</script>

<template>
  <div :class="$style.calculator">
    <div :class="$style.calculator__title">
      Получите рассчет стоимости заказа
    </div>
    <form :class="$style.form">
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
            :shipment-countries="fromCFSCountry"
            :shipment-city="fromCFS"
          />

          <shipment-direction-card
            v-model:city="city.to"
            v-model:transport-hub-selected="transportHub.to"
            v-model:country="country.to"
            direction="Куда"
            direction-sub-label="Пункт направления"
            :transport-hubs="transportHubs"
            :shipment-countries="toCFSCountry"
            :shipment-city="filteredToCFS"
          />
        </div>

        <div :class="$style.form__cargo">
          <cargo-card
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

        <div :class="$style['form__button-group']">
          <button :class="clsx($style['button-group__button'], $style['button-group__button--reset'])" @click.prevent="calculateReset">Сбросить</button>
          <calculate-result-dialog 
            :cost="cost" 
            :params="params" 
            :class="clsx($style['button-group__button'], $style['button-group__button--search'])" 
            @calcualte-cost="cost = calculateShippingCost(params)" />
        </div>
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

.form__button-group {
  display: flex;
  justify-content: end;
  margin-top: 10px;
  gap: 10px;
}

.button-group__button {
  font-family: 'Inter';
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 8px;
  border: 1px solid;
  background-color: transparent;
  min-height: 40px;
  width: 100%;
  max-width: 115px;
  cursor: pointer;
}

.button-group__button:hover {
  border-color: #5BC0F2;
}

.button-group__button:active {
  transform: translateY(-0.5px);
}

.button-group__button--reset {
  color: #1E1E1E;
  border-color: #1E1E1E;
}

.button-group__button--search {
  color: var(--white);
  border-color: var(--white);
}

@media screen and (min-width: 768px) {
  .button-group__button {
    max-width: 200px;
  }
}

@media screen and (min-width: 768px) {
  .form__shipment-direction {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    column-gap: 10px;
  }
}
</style>
