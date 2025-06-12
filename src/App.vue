<script setup lang="ts">
import { CargoCard, ReverseButton, ShipmentDirectionCard } from '@/components'

const fromCFSCountry = ['Россия', 'Китай']
const fromCFS = ['Hefei', 'Suzhou', 'Chongqing-manzhouli', 'Xian-manzhouli', 'Xian-Khorgos/Alashankou', 'Chengdu-Khorgos/Alashankou', 'Saint petersburg']
const toCFS = ['Moscow', 'Saint Petersburg', 'Minsk', 'Kaliningrad']
const transportHubs = ['Город', 'Морской порт', 'Аэропорт', 'Ж/Д станция']
</script>

<template>
  <form :class="$style.form">
    <div :class="$style['form__shipment-direction']">
      <shipment-direction-card direction="Откуда" direction-sub-label="Пункт назначения" :transport-hubs="transportHubs" :shipment-city="fromCFS" :shipment-countries="fromCFSCountry" />

      <div>
        <div :class="$style['shipment-direction__reverse-button']">
          <reverse-button />
        </div>
      </div>

      <shipment-direction-card direction="Куда" direction-sub-label="Пункт направления" :transport-hubs="transportHubs" :shipment-city="toCFS" :shipment-countries="fromCFSCountry" />
    </div>

    <div :class="$style.form__cargo">
      <cargo-card />
    </div>
  </form>
</template>

<style lang="css" module>
.form {
  padding: 12px;
  background-color: var(--color-background);
}

.form__shipment-direction {
  display: grid;
  justify-items: center;
  grid-template-columns: auto;
  grid-template-rows: 1fr;
  position: relative;
  max-width: 959px;
  margin: 0 auto;
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
  max-width: 959px;
}

@media screen and (min-width: 768px) {
  .form__shipment-direction {
    grid-template-columns: 1fr auto 1fr;
    grid-template-rows: auto;
    column-gap: 10px;
  }
}
</style>
