<script setup lang="ts">
import type { I18nMessagesSchema } from '@/shared/types/i18n'
import { ToastAction, ToastDescription, ToastRoot, ToastTitle, ToastViewport } from 'reka-ui'
import { useI18n } from 'vue-i18n'
import { BaseCard } from '@/shared/ui/card'
import { BaseSwitch } from '@/shared/ui/switch'

defineProps<CalculateSwitchProps>()

const { t } = useI18n<{ message: I18nMessagesSchema }>()

type CalculateSwitchProps = {
  id: string
  label: string
  toastTitle: string
  toastDescription: string
}

const modelValue = defineModel<boolean>({ required: true })
</script>

<template>
  <base-card :class="$style['switch-card']">
    <base-switch :id="id" v-model="modelValue" />
    <label :for="id" :class="$style.switch__label">{{ label }}</label>
    <toast-root v-model:open="modelValue" :duration="60000" :class="$style['toast-root']">
      <toast-title :class="$style['toast-title']">
        {{ toastTitle }}
      </toast-title>
      <toast-description :class="$style['toast-description']">
        {{ toastDescription }}
      </toast-description>
      <toast-action :class="$style['toast-action']" alt-text="Go to contacts" as-child>
        <button :class="$style['toast-button']">
          {{ t('closeButton') }}
        </button>
      </toast-action>
    </toast-root>
    <toast-viewport :class="$style['toast-viewport']" />
  </base-card>
</template>

<style lang="css" module>
.switch-card {
  display: flex;
  gap: 15px;
  align-items: center;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 10px;
}

.switch__label {
  font-family: 'Inter';
  font-weight: 500;
  cursor: pointer;
}

.toast-root {
  background-color: var(--background-primary);
  border-radius: 6px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  padding: 15px;
  display: grid;
  grid-template-areas: 'title action' 'description action';
  grid-template-columns: auto max-content;
  column-gap: 15px;
  align-items: center;
}

.toast-root[data-state='open'] {
  animation: slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-root[data-state='closed'] {
  animation: hide 100ms ease-in;
}

.toast-root[data-swipe='move'] {
  transform: translateX(var(--reka-toast-swipe-move-x));
}

.toast-root[data-swipe='cancel'] {
  transform: translateX(0);
  transition: transform 200ms ease-out;
}

.toast-root[data-swipe='end'] {
  animation: swipeOut 100ms ease-out;
}

.toast-viewport {
  --viewport-padding: 25px;
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: var(--viewport-padding);
  gap: 10px;
  width: 390px;
  max-width: 100vw;
  margin: 0;
  list-style: none;
  z-index: 2147483647;
  outline: none;
}

.toast-title {
  grid-area: title;
  margin-bottom: 5px;
  font-weight: 500;
  color: var(--white);
  font-size: 15px;
}

.toast-description {
  grid-area: description;
  margin: 0;
  color: var(--vt-c-white-soft);
  font-size: 13px;
  line-height: 1.3;
}

.toast-action {
  grid-area: action;
}

.toast-button {
  background-color: #6E99AE;
  color: var(--white);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: 1px solid #9AB8C6;
  font-weight: 500;
  min-height: 28px;
  cursor: pointer;
}

.toast-button:hover {
  background-color: #5D8BA1;
  border-color: #5BC0F2;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.toast-button:active {
  background-color: #4D7B92;
  transform: translateY(0);
}

@keyframes hide {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes slideIn {
  from {
    transform: translateX(calc(100% + var(--viewport-padding)));
  }
  to {
    transform: translateX(0);
  }
}

@keyframes swipeOut {
  from {
    transform: translateX(var(--reka-toast-swipe-end-x));
  }
  to {
    transform: translateX(calc(100% + var(--viewport-padding)));
  }
}
</style>
