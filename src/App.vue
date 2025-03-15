<script setup lang="ts">
import theme from "@/config/ant/theme.ts";
import CoreComponent from "@/components/CoreComponent.vue";
</script>

<template>
  <a-config-provider :theme="theme">
    <core-component>
      <router-view />
    </core-component>
  </a-config-provider>
</template>

<style scoped></style>
