<script setup lang="ts">
import ShipmentDirectionCard from '@/components/ShipmentDirectionCard .vue'
import ReverseButton from './components/ReverseButton.vue'

const fromCFSCountry = ['Россия', 'Китай']
const fromCFS = ['Hefei', 'Suzhou', 'Chongqing-manzhouli', 'Xian-manzhouli', 'Xian-Khorgos/Alashankou', 'Chengdu-Khorgos/Alashankou', 'Saint petersburg']
const toCFS = ['Moscow', 'Saint Petersburg', 'Minsk', 'Kaliningrad']
const transportHubs = ['Город', 'Морской порт', 'Аэропорт', 'Ж/Д станция']
</script>

<template>
  <form :class="$style.form">
    <div :class="$style['form__shipment-direction']">
      <div :class="$style['shipment-direction__card']">
        <shipment-direction-card direction="Откуда" direction-sub-label="Пункт назначения" :transport-hubs="transportHubs" :shipment-city="fromCFS" :shipment-countries="fromCFSCountry" />
      </div>

      <div>
        <div :class="$style['shipment-direction__reverse-button']">
          <reverse-button />
        </div>
      </div>

      <div>
        <shipment-direction-card direction="Куда" direction-sub-label="Пункт направления" :transport-hubs="transportHubs" :shipment-city="toCFS" :shipment-countries="fromCFSCountry" />
      </div>
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
}

.shipment-direction__card {
  margin-bottom: 12px;
}

.shipment-direction__reverse-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
