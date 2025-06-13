<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui'

import clsx from 'clsx'
import { ChevronDown } from 'lucide-vue-next'
import {
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from 'reka-ui'

type SelectProps = {
  options: string[]
  defaultValue?: AcceptableValue
  placeholder?: string
  class?: string
  classTrigger?: string
}

const props = defineProps<SelectProps>()
const modelValue = defineModel<string>()
</script>

<template>
  <select-root v-model="modelValue" :default-value="defaultValue">
    <select-trigger :class="clsx(props.classTrigger, $style.select__trigger)">
      <select-value :placeholder="placeholder" :class="clsx(props.class, $style['select-trigger__value'])">
        {{ modelValue }}
      </select-value>
      <chevron-down :class="$style['select-trigger__chevron']" />
    </select-trigger>

    <select-portal>
      <select-content align="center" :class="$style['select-portal__content']" position="popper">
        <select-viewport :class="$style['select-content__viewport']">
          <select-item v-for="option in options" :key="option" :class="$style.select__item" :value="option">
            <select-item-indicator :class="$style['select-item__indicator']" />
            <select-item-text>{{ option }}</select-item-text>
          </select-item>
        </select-viewport>
      </select-content>
    </select-portal>
  </select-root>
</template>

<style lang="css" module>
.select__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--white);
  background-color: var(--background-secondary);
  width: 100%;
  padding: 10px 15px;
  outline: none;
  border: 1px solid var(--white);
  border-radius: 8px;
  cursor: pointer;
}

.select__trigger[data-state='open'] {
  border: 1px solid #00E0FF;
}

.select__trigger[data-state='open'] .select-trigger__chevron {
  color: #00E0FF;
  transform: rotate(180deg);
  transition: transform 0.150s ease-in;
}

.select-trigger__value {
  font-family: 'Inter';
  font-weight: 400;
  font-size: 12px;
}

.select-trigger__chevron {
  width: 12px;
  height: 12px;
}

.select-portal__content {
  background-color: var(--background-secondary);
  width: var(--reka-select-trigger-width);
  max-height: var(--reka-select-content-available-height);
}

.select-content__viewport {
  background-color: #5BC0F2;
  border: 1px solid var(--white);
}

.select__item {
  display: flex;
  padding-inline: 10px;
  height: 35px;
  cursor: pointer;
  font-size: 12px;
  border-bottom: 1px solid var(--white);
}

.select__item:hover {
  background-color: #000000;
  opacity: 0.8;
  outline: none;
}

.select__item[data-state='checked'] {
  /* background-color: var(--active); */
}

.select-item-indicator__icon {
  width: 12px;
}
</style>
