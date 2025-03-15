<script setup lang="ts">
import ImageComponent from '@/components/ImageComponent.vue'
import { Movie } from '@/types/movie.ts'
import IconHeardRoundedSolid from '@/components/icons/IconHeardRoundedSolid.vue'
import IconHeardRoundedLine from '@/components/icons/IconHeard-rounded-line.vue'
import useMovies from '@/store/movies.pinia.ts'
import useModal from '@/composables/useModal.ts'
import { shallowRef } from 'vue'
import MovieFormModalComponent from '@/pages/movies/components/MovieFormModalComponent.vue'
import { useI18n } from 'vue-i18n'
import IconEdit from '@/components/icons/IconEdit.vue'
import dayjs from 'dayjs'
import IconTrash from '@/components/icons/IconTrash.vue'

const { t } = useI18n()
const { open } = useModal()

const props = defineProps<{
    movie: Movie
    favorite: boolean
}>()

const moviesStore = useMovies()

function onClickFavorite(): void {
    moviesStore.toggleFavorite(props.movie.id)
}

function openMovieFormModal(): void {
    open({
        title: t('MoviesView.edit_movie'),
        component: shallowRef(MovieFormModalComponent),
        props: {
            movie: props.movie
        }
    })
}

function deleteMovie(): void {
    moviesStore.deleteMovie(props.movie.id)
}
</script>

<template>
    <a-card class="movie_card h-full" :bordered="false">
        <template #cover>
            <div class="h-[300px] overflow-hidden flex items-center rounded-xl">
                <image-component :src="movie.image" :alt="movie.name" />
            </div>
        </template>
        <div class="h-full flex flex-col justify-between">
            <div>
                <h3 class="text-2xl font-bold">{{ movie.name }}</h3>
                <p class="line-clamp-2">{{ movie.description }}</p>
            </div>
            <div class="pt-2 flex justify-between items-center">
                <div class="flex justify-start items-center">
                    <span class="font-semibold">{{
                        dayjs(movie.year).format('YYYY')
                    }}</span>
                    <span class="movie_genre ml-4">
                        <a-tag v-for="item in movie.genre">
                            {{ item }}
                        </a-tag>
                    </span>
                </div>
                <a-space>
                    <a-button
                        @click="openMovieFormModal"
                        class="!justify-center text-xl"
                    >
                        <template #icon>
                            <icon-edit />
                        </template>
                    </a-button>
                    <a-button
                        @click="deleteMovie"
                        danger
                        class="!justify-center text-xl"
                    >
                        <template #icon>
                            <icon-trash />
                        </template>
                    </a-button>
                    <a-button
                        @click="onClickFavorite"
                        class="!justify-center text-xl"
                        type="text"
                        danger
                    >
                        <template #icon>
                            <icon-heard-rounded-solid v-if="favorite" />
                            <icon-heard-rounded-line v-else />
                        </template>
                    </a-button>
                </a-space>
            </div>
        </div>
    </a-card>
</template>

<style scoped lang="scss">
.movie_card {
    display: flex;
    flex-direction: column;
    &:deep(.ant-card-body) {
        flex: 1;
    }
}
.movie_genre {
    position: relative;
    &:before {
        content: '';
        position: absolute;
        top: calc(50% - 1px);
        left: -10px;
        width: 4px;
        height: 4px;
        border-radius: 50%;
        @apply bg-muted;
    }
}
</style>
