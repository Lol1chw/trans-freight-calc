<script setup lang="ts">
import { ref } from 'vue'
import TransportHubTabs from '@/components/TransportHubTabs.vue'
import { BaseCard } from '@/shared/ui/card'
import { BaseSelect } from '@/shared/ui/select'

type ShipmentDirectionCardProps = {
  direction: 'Откуда' | 'Куда'
  directionSubLabel: 'Пункт направления' | 'Пункт назначения'
  shipmentCountries: string[]
  shipmentCity: string[]
  transportHubs: string[]
}

const props = defineProps<ShipmentDirectionCardProps>()

const country = ref<string>(props.shipmentCountries[0])
const transportHubSelected = ref<string>(props.transportHubs[0])
const city = ref<string>(props.shipmentCity[0])
</script>

<template>
  <base-card :class="$style['shipment-card']">
    <div :class="$style['shipment-card__content-grid']">
      <div :class="$style['shipment-card__section-header']">
        <span>{{ direction }}</span>
        <span :class="$style['shipment-card__section-subtitle']">{{ directionSubLabel }}</span>
      </div>

      <div :class="$style['shipment-card__field-group']">
        <div :class="$style['shipment-card__field-label']">
          Страна
        </div>
        <div :class="$style['shipment-card__field-helper']">
          Начните вводить название страны и выберите из списка
        </div>
        <base-select :model-value="country" :options="shipmentCountries" />
      </div>

      <div :class="$style['shipment-card__field-group']">
        <transport-hub-tabs v-model="transportHubSelected" :transport-hubs="transportHubs" />
      </div>

      <div>
        <div :class="$style['shipment-card__field-helper']">
          Введите город/населенный пункт
        </div>
        <base-select :class="$style['shipment-card__transport-hub-select']" placeholder="Введите город/населенный пункт" :model-value="city" :options="shipmentCity" />
      </div>
    </div>
  </base-card>
</template>

<style lang="css" module>
.shipment-card__transport-hub-select {
  font-size: 12px;
}

.shipment-card {
  max-width: 350px;
  border-radius: 12px;
  padding: 28px 32px;
}

.shipment-card__content-grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50px 1fr min-content 1fr
}

.shipment-card__section-header {
  display: flex;
  justify-content: space-between;
}

.shipment-card__section-subtitle {
  color: var(--primary);
  font-size: 12px;
}

.shipment-card__field-label,
.shipment-card__field-helper {
  color: var(--primary);
}

.shipment-card__field-label {
  font-size: 12px;
}

.shipment-card__field-helper {
  font-size: 10px;
  margin-bottom: 5px;
}

.shipment-card__field-group {
  margin-bottom: 15px;
}

@media screen and (min-width: 350px) {
  .shipment-card__content-grid {
    grid-template-rows: 50px 1fr min-content 1fr;
  }
}
</style>
