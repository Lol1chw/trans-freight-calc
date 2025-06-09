<template>
  <div :class="$style['base-card']">
    <slot />
  </div>
</template>

<style lang="css" module>
.base-card {
    background-color: var(--background-secondary);
}
</style>
