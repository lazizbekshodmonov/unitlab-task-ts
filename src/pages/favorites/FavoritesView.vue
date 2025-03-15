<script setup lang="ts">
import MovieCardComponent from '@/pages/movies/components/MovieCardComponent.vue'
import { computed, onMounted } from 'vue'
import useMovies from '@/store/movies.pinia.ts'
import { storeToRefs } from 'pinia'

const moviesStore = useMovies()
const movies = computed(() => moviesStore.getFavoriteMovies)
const { favorites } = storeToRefs(moviesStore)

onMounted(() => {
    moviesStore.getFavorites()
})
</script>

<template>
    <a-row :gutter="[12, 12]">
        <a-col
            :sm="24"
            :md="12"
            :lg="8"
            :xl="8"
            v-for="item in movies"
            :key="item.id"
        >
            <movie-card-component
                :movie="item"
                :favorite="favorites.has(item.id)"
            />
        </a-col>
    </a-row>
</template>

<style scoped></style>
