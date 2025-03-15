<script setup lang="ts">
import useMovies from '@/store/movies.pinia.ts'
import { storeToRefs } from 'pinia'
import MovieCardComponent from '@/pages/movies/components/MovieCardComponent.vue'
import { onMounted, shallowRef } from 'vue'
import { useI18n } from 'vue-i18n'
import useModal from '@/composables/useModal.ts'
import MovieFormModalComponent from '@/pages/movies/components/MovieFormModalComponent.vue'

const { t } = useI18n()
const { open } = useModal()
const moviesStore = useMovies()

const { movies, favorites } = storeToRefs(moviesStore)

onMounted(() => {
    moviesStore.getMovies()
    moviesStore.getFavorites()
})

function openMovieFormModal() {
    open({
        title: t('MoviesView.create_movie'),
        component: shallowRef(MovieFormModalComponent)
    })
}
</script>

<template>
    <div class="flex justify-end pb-4 pt-2 px-2">
        <a-button @click="openMovieFormModal" type="primary">
            {{ t('ADD') }}
        </a-button>
    </div>
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
                @favorite=""
                :movie="item"
                :favorite="favorites.has(item.id)"
            />
        </a-col>
    </a-row>
</template>

<style scoped></style>
