<script setup lang="ts">
import NavbarComponent from '@/components/NavbarComponent.vue'
</script>

<template>
    <header>
        <navbar-component />
    </header>
    <main class="container mx-auto pt-4">
        <router-view />
    </main>
</template>

<style scoped></style>
