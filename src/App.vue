<script setup lang="ts">
import { CargoCard, ReverseButton, ShipmentDirectionCard } from '@/components'
import { BaseCard } from '@/shared/ui/card'
import { BaseSwitch } from '@/shared/ui/switch'

const fromCFSCountry = ['Россия', 'Китай']
const fromCFS = ['Hefei', 'Suzhou', 'Chongqing-manzhouli', 'Xian-manzhouli', 'Xian-Khorgos/Alashankou', 'Chengdu-Khorgos/Alashankou', 'Saint petersburg']
const toCFS = ['Moscow', 'Saint Petersburg', 'Minsk', 'Kaliningrad']
const transportHubs = ['Город', 'Морской порт', 'Аэропорт', 'Ж/Д станция']
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
          <shipment-direction-card direction="Откуда" direction-sub-label="Пункт назначения" :transport-hubs="transportHubs" :shipment-city="fromCFS" :shipment-countries="fromCFSCountry" />

          <div :class="$style['shipment-direction__reverse-button']">
            <reverse-button />
          </div>

          <shipment-direction-card direction="Куда" direction-sub-label="Пункт направления" :transport-hubs="transportHubs" :shipment-city="toCFS" :shipment-countries="fromCFSCountry" />
        </div>

        <div :class="$style.form__cargo">
          <cargo-card />
        </div>

        <base-card :class="$style['form__switch-card']">
          <base-switch id="Таможенное оформление" />
          <label for="Таможенное оформление" :class="$style['switch-card__label']">Таможенное оформление</label>
        </base-card>

        <base-card :class="$style['form__switch-card']">
          <base-switch id="Страхование груза" />
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
