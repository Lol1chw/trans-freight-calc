<script setup lang="ts">
import { Languages } from 'lucide-vue-next'
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuRoot, DropdownMenuTrigger } from 'reka-ui'
</script>

<template>
  <dropdown-menu-root>
    <dropdown-menu-trigger
      :class="$style['switch-language__trigger']"
    >
      <languages :class="$style['switch-language-trigger__icon']" />
    </dropdown-menu-trigger>

    <dropdown-menu-portal>
      <dropdown-menu-content :class="$style['switch-language-content']">
        <dropdown-menu-item :class="$style['switch-language-content__item']" @select="$i18n.locale = 'ru'">
          Русский
        </dropdown-menu-item>
        <dropdown-menu-item :class="$style['switch-language-content__item']" @select="$i18n.locale = 'en'">
          English
        </dropdown-menu-item>
      </dropdown-menu-content>
    </dropdown-menu-portal>
  </dropdown-menu-root>
</template>

<style lang="css" module>
    .switch-language__trigger {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 32px;
        height: 32px;

        border: none;
        outline: none;

        background: transparent;
        border-radius: 12px;
    }

    .switch-language__trigger:hover {
        background-color: #ffffff30;
    }

    .switch-language-trigger__icon {
        width: 18px;
        height: 18px;
        color: #FFFFFF;
        pointer-events: none;
    }

    .switch-language-content {
        background-color: #FFFFFF;

        padding: 6px;
        border-radius: 12px;
    }

    .switch-language-content__item {
        color: #000000;

        font-size: 14px;
        font-weight: 400;
        font-family: 'Inter';

        padding: 4px 8px;
        border-radius: 8px;
    }

    .switch-language-content__item:hover {
        background-color: #ebebeb;

        cursor: pointer;
    }
</style>
