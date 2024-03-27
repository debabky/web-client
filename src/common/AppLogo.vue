<template>
  <div class="app-logo">
    <img
      class="app-logo__img"
      src="/branding/logo.png"
      :alt="$config.APP_NAME"
    />
    <router-link class="app-logo__link" :to="{ name: $routes.home }" />
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.app-logo {
  display: flex;
  flex-direction: column;
  position: relative;
}

.app-logo__img {
  max-width: toRem(60);
  max-height: toRem(60);
}

.app-logo__link {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
}
</style>
