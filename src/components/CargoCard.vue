<script setup lang="ts">
import { ref } from 'vue'
import { BaseCard } from '@/shared/ui/card'
import { InputGroup } from '@/shared/ui/input-group'
import { NumberInput } from '@/shared/ui/number-input'
import { BaseSelect } from '@/shared/ui/select'
import { Toggle, ToggleGroup } from '@/shared/ui/toggle'
import CargoTabs from './CargoTabs.vue'

type ContainerSizeType = '20’' | '40’' | '40’HC'

const cargoTypes = ['Контейнеры', 'Коробки/Палеты', 'Машины']
const toggleModelValue = ref<ContainerSizeType>('20’')
</script>

<template>
  <base-card :class="$style['cargo-card']">
    <div :class="$style['cargo-card__content-grid']">
      <div :class="$style['cargo-card__section-header']">
        <span>Груз</span>
      </div>

      <cargo-tabs :cargo-types="cargoTypes" />

      <div :class="$style['cargo-card__section-calculate']">
        <div :class="$style['section-calculate__wrapper']">
          <div :class="$style['section-calculate__input-wrapper']">
            <label :class="$style['section-calculate__label']">Количество (шт)</label>
            <number-input />
          </div>

          <div>
            <label :class="$style['section-calculate__label']">Тип контейнера</label>
            <toggle-group v-model="toggleModelValue" :class="$style['section-calculate__container-type-toggle']">
              <toggle :class="$style['cointaer-type-toggle__item']" value="20’">
                20’
              </toggle>
              <toggle :class="$style['cointaer-type-toggle__item']" value="40’">
                40’
              </toggle>
              <toggle :class="$style['cointaer-type-toggle__item']" value="40’HC">
                40’HC
              </toggle>
            </toggle-group>
          </div>
        </div>

        <div :class="$style['section-calculate__container-weight']">
          <label :class="$style['section-calculate__label']">Вес</label>
          <input-group>
            <base-select :options="['KG']" default-value="KG" :class-trigger="$style.select" />
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
  padding: 28px 32px;
}

.cargo-card__content-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50px auto 1fr;
  row-gap: 10px;
}

.cargo-card__section-header {
  margin-bottom: 20px;
}

.cargo-card__section-calculate {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
}

.section-calculate__wrapper {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
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

.section-calculate__container-type-toggle {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: fit-content;
  max-width: 300px;
  flex: 1 1 auto;
}

.section-calculate__container-weight {
  width: 100%;
  max-width: 150px;
}

@media screen and (max-width: 320px) {
  .section-calculate__wrapper {
    display: flex;
    justify-content: space-between;
  }

  .section-calculate__container-type-toggle {
    display: grid;
    grid-template-columns: repeat(3, auto);
    row-gap: 10px;
  }
}

@media (min-width: 320px) and (max-width: 400px) {
  .section-calculate__container-type-toggle {
    display: grid;
    grid-template-columns: repeat(3, auto);
    row-gap: 10px;
  }

  .cointaer-type-toggle__item:nth-child(1) {
    grid-row: 2 / 2;
    grid-column: 1 / 1;
  }

  .cointaer-type-toggle__item:nth-child(2) {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
    margin-left: 8px;
  }

  .cointaer-type-toggle__item:nth-child(3) {
    grid-row: 1 / 1;
    grid-column: 1 / 3;
    justify-self: center;
    width: 100%;
  }
}

@media screen and (min-width: 600px) {
  .section-calculate__label {
    font-size: 12px;
  }
}
</style>
