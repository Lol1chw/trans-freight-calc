<script setup lang="ts">
import type { ShippingParams } from '@/components/const/calculate-routes'
import clsx from 'clsx'
import { ToastProvider } from 'reka-ui'
import { computed, ref, watch } from 'vue'
import { CalculateResultDialog, CalculateSwitch, CargoCard, ShipmentDirectionCard } from '@/components'
import { calculateShippingCost, ROUTES } from '@/components/const/calculate-routes'

import { SwitchLanguage } from './components/switch-language'
import { useI18n } from 'vue-i18n'

import type { I18nMessagesSchema } from './shared/types/i18n'

const { t, tm } = useI18n<{ message: I18nMessagesSchema }>()

const defaultValues = {
  from: 'Hefei',
  to: 'Moscow',
  volumeCBM: 2,
  weight: 500,
  customsIncluded: false,
  insurance: false,
  cargoType: 'Коробки/Палеты',
  cost: 0,
}
const fromCFSCountry = tm('fromCFSCountry')
const toCFSCountry = tm('toCFSCountry')
const fromCFS = ['Hefei', 'Suzhou', 'Chongqing-manzhouli', 'Xi\'an-Manzhouli', 'Xian-Khorgos/Alashankou']

type ChinaCity = string
type RussiaCity = string

type City =
  | { from: RussiaCity, to: ChinaCity }
  | { from: ChinaCity, to: RussiaCity }


const city = ref<City>({ from: defaultValues.from, to: defaultValues.to })
const cargoVolumeCBM = ref<number>(defaultValues.volumeCBM)
const cargoWeight = ref<number>(defaultValues.weight)
const cargoWeightType = ref<'KG'>('KG')
const customsIncluded = ref<boolean>(false)
const isCargoInsured = ref<boolean>(false)
const cost = ref<number>(0)

const transportHub = computed(() => {
  return {
    from: tm('transportHubs')[0], 
    to: tm('transportHubs')[0] 
  }
})
const transportHubs = computed(() => tm('transportHubs'))
const cargoType = computed(() => tm('cargoTabs.cargoTypes')[0])
const country = computed(() => ({
  from: t('country.from'),
  to: t('country.to')
}))

const params = computed<ShippingParams>(() => {
  return {
    from: city.value.from,
    to: city.value.to,
    cargoType: cargoType.value,
    volumeCBM: Number(cargoVolumeCBM.value),
    weight: Number(cargoWeight.value),
    customsIncluded: customsIncluded.value,
    insurance: isCargoInsured.value,
  }
})

const filteredToCFS = ref<string[]>([])

watch(params, (params) => {
  if (params.from) {
    const filteredRoutesTo = ROUTES.filter(el => el.from === params.from).flatMap(el => el.to)
    filteredToCFS.value = filteredRoutesTo
    if (!filteredRoutesTo.includes(city.value.to)) {
      city.value.to = filteredRoutesTo[0]
    }
  }
}, { immediate: true })

function calculateReset() {
  city.value.from = defaultValues.from
  city.value.to = defaultValues.to
  cargoVolumeCBM.value = defaultValues.volumeCBM
  cargoWeight.value = defaultValues.weight
  customsIncluded.value = defaultValues.customsIncluded
  isCargoInsured.value = defaultValues.insurance
  cost.value = defaultValues.cost
}
</script>

<template>
  <toast-provider>
    <div :class="$style.calculator">
      <div :class="$style.calculator__header">
        <div :class="$style.calculator__title">
          {{ $t('header.title') }}
        </div>
        <div>
          <switch-language />
        </div>
      </div>
      <form :class="$style.form">
        <h1 :class="$style.form__title">
          {{ $t('form.title') }}
        </h1>
        <div :class="$style.form__wrapper">
          <div :class="$style['form__shipment-direction']">
            <shipment-direction-card
              v-model:city="city.from"
              v-model:transport-hub-selected="transportHub.from"
              v-model:country="country.from" :direction="$t('shipmentDirectionCard.direction.from')"
              :direction-sub-label="$t('shipmentDirectionCard.directionSubLabel.from')"
              :transport-hubs="transportHubs"
              :shipment-countries="fromCFSCountry"
              :shipment-city="fromCFS"
            />

            <shipment-direction-card
              v-model:city="city.to"
              v-model:transport-hub-selected="transportHub.to"
              v-model:country="country.to"
              :direction="$t('shipmentDirectionCard.direction.to')"
              :direction-sub-label="t('shipmentDirectionCard.directionSubLabel.to')"
              :transport-hubs="transportHubs"
              :shipment-countries="toCFSCountry"
              :shipment-city="filteredToCFS"
            />
          </div>

          <div :class="$style.form__cargo">
            <cargo-card
              v-model:cargo-volume="cargoVolumeCBM"
              v-model:cargo-type="cargoType"
              v-model:cargo-weight="cargoWeight"
              v-model:cargo-weight-type="cargoWeightType"
            />
          </div>

          <calculate-switch
            :id="t('customClearance.title')"
            v-model="customsIncluded"
            :label="t('customClearance.title')"
            :toast-title="t('customClearance.title')"
            :toast-description="t('customClearance.description')"
          />

          <calculate-switch
            :id="t('cargoInsurance.title')"
            v-model="isCargoInsured"
            :label="t('cargoInsurance.title')"
            :toast-title="t('cargoInsurance.title')"
            :toast-description="t('cargoInsurance.description')"
          />

          <div :class="$style['form__button-group']">
            <button :class="clsx($style['button-group__button'], $style['button-group__button--reset'])" @click.prevent="calculateReset">
              {{ t('resetButton') }}
            </button>
            <calculate-result-dialog
              :cost="cost"
              :params="params"
              :class="clsx($style['button-group__button'], $style['button-group__button--search'])"
              @calcualte-cost="cost = calculateShippingCost(params)"
            />
          </div>
        </div>
      </form>
    </div>
  </toast-provider>
</template>

<style lang="css" module>
.calculator {
  padding: 12px;
}

.calculator__header {
  display: flex;
  justify-content: space-between;

  margin-bottom: 10px;
}

.calculator__title {
  font-family: 'Inter';
  font-family: 500;
  font-size: 14px;
  padding-left: 12px;
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
