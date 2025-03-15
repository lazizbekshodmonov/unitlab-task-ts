<script setup lang="ts"></script>

<template>
    <nav class="h-[60px] border-b-[1px] flex justify-start gap-10">
        <div class="h-full overflow-hidden flex items-center justify-center">
            <img class="w-32" src="@/assets/images/images.png" alt="" />
        </div>
        <ul class="flex items-center gap-4 m-0">
            <li>
                <router-link to="/movies"> Movies </router-link>
            </li>
            <li>
                <router-link to="/favorites"> Favorites </router-link>
            </li>
        </ul>
    </nav>
</template>

<style scoped></style>
