<script setup lang="ts">
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
} from 'reka-ui'
import { CheckCircleIcon, CircleX } from 'lucide-vue-next'
import clsx from 'clsx';
import type { ShippingParams } from './const/calculate-routes';

type CalculateResultDialogProps = {
  class?: string
  params: ShippingParams
  cost: number
}

type CalculateResultDialogEmits = {
  (e: 'calcualteCost'): number
}

const props = defineProps<CalculateResultDialogProps>()
const emits = defineEmits<CalculateResultDialogEmits>()
</script>

<template>
    <AlertDialogRoot>
        <AlertDialogTrigger :class="props.class">Рассчитать</AlertDialogTrigger>
        <AlertDialogPortal>
            <AlertDialogOverlay :class="$style.overlay"/>
            <AlertDialogContent :class="$style.content">
                <AlertDialogTitle>Итоговый рассчет</AlertDialogTitle>
                <AlertDialogDescription :class="$style.description">Здесь вы можете ознакомиться с итоговым рассчетом. По завершении нажмите закрыть.</AlertDialogDescription>
                <div>
                    <div>Город отправления: {{ params.from }}</div>
                    <div>Город получения: {{ params.to }}</div>
                    <div>Тип груза: {{ params.cargoType }}</div>
                    <div>Вес: {{ params.weight || 0 }}</div>
                    <div>Количество {{ params.volumeCBM || 0 }}</div>
                    <div>Таможенное оформление:
                      <check-circle-icon :class="$style.icon" v-if="params.customsIncluded"/> 
                      <circle-x :class="$style.icon" v-else/>
                    </div>
                    <div :style="{ display: 'inline-block'}">Страхование груза: 
                      <check-circle-icon :class="$style.icon" v-if="params.insurance"/> 
                      <circle-x :class="$style.icon" v-else/>
                    </div>
                </div>
                <p v-if="cost > 0" :style="{  display: 'flex', justifyContent: 'flex-end', fontSize: '22px', 'margin': '15px 0px' }">Стоимость: {{ cost }} USD</p>
                <div :style="{ display: 'flex', marginTop: '25px', alignItems: 'center', gap: '10px', justifyContent: 'flex-end', flexWrap: 'wrap' }">
                    <button :class="clsx($style.button, $style['button--calc'])" @click="emits('calcualteCost')">Рассчитать</button>
                    <AlertDialogCancel as-child>
                        <button :class="$style.button">Закрыть</button>
                    </AlertDialogCancel>
                </div>
            </AlertDialogContent>
        </AlertDialogPortal>
    </AlertDialogRoot>
</template>

<style lang="css" module>
.overlay {
    position: fixed;
    inset: 0;
    background-color: #000000b3;
    animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

.content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 6px;
    box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
    width: 90vw;
    max-width: 450px;
    max-height: 85vh;
    padding: 25px;
    background-color: var(--color-background);
    animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

.description {
    margin: 10px 0 20px;
    color: #B6C5CD;
    font-size: 15px;
    line-height: 1.5;
}

.icon {
  width: 16px;
  height: 16px;
  vertical-align: middle;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--white);
  border-radius: 4px;
  padding: 0 15px;
  font-size: 15px;
  line-height: 1;
  font-weight: 500;
  height: 35px;
  background-color: transparent;
  color: var(--white);
  cursor: pointer;
}

.button--calc {
  background-color: #B6C5CD;
}

.button:hover {
    border-color: #5BC0F2;
}

.button:active {
    transform: translateY(-0.5px);
}

@keyframes overlayShow {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes contentShow {
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>