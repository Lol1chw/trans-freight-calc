<script setup lang="ts">
import { ChevronDown, ChevronUp } from 'lucide-vue-next'
import { NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput, NumberFieldRoot } from 'reka-ui'
</script>

<template>
  <number-field-root :class="$style['number-input']">
    <number-field-input placeholder="Введите кол-во" :class="$style['number-input__input']" />
    <div :class="$style['number-input__button-group']">
      <number-field-increment :class="$style['number-input__button']">
        <chevron-up :class="$style.button__icon" height="16px" />
      </number-field-increment>
      <number-field-decrement :class="$style['number-input__button']">
        <chevron-down :class="$style.button__icon" height="16px" />
      </number-field-decrement>
    </div>
  </number-field-root>
</template>

<style lang="css" module>
.number-input {
  display: flex;
}

.number-input__input {
  background-color: var(--background-secondary);
  color: var(--white);
  border: 1px solid var(--white);
  border-radius: 8px 0 0 8px;
  padding: 0 0 0 10px;
  width: 100%;
}

.number-input__input:focus-visible {
  border-color: #5BC0F2;
  outline: none;
}

.number-input__input::placeholder {
  color: var(--primary);
  font-size: 8px;
}

.number-input__button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 25px;
  background-color: var(--background-secondary);
  color: var(--white);
  border: none;
  border-top: 1px solid var(--white);
  border-right: 1px solid var(--white);
  cursor: pointer;
  margin: 0;
  padding: 0;
}

.number-input__button:first-child {
  border-bottom: 1px solid var(--white);
  border-radius: 0 8px 0 0;
}

.number-input__button:last-child {
  border-top: none;
  border-bottom: 1px solid var(--white);
  border-radius: 0 0 8px 0;
}

.number-input__button[data-pressed=true] {
  transform: translateY(0.5px);
  border-color: #5BC0F2;
}

.number-input__button[data-pressed=true] .button__icon{
  color: #5BC0F2;
}

@media screen and (min-width: 600px) {
  .number-input__input::placeholder {
    font-size: 14px;
  }
}
</style>
