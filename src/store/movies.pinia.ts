import { defineStore } from 'pinia'
import moviesJson from '@/assets/data.json'
import { MovieState } from '@/types/state.ts'
import { Movie } from '@/types/movie.ts'
import { getCountriesApi } from '@/api/countries.api.ts'
import dayjs from 'dayjs'

const useMovies = defineStore('MoviesStore', {
    state: (): MovieState => ({
        movies: [],
        favorites: new Set<number>(),
        countries: [],
        genres: [
            'Action',
            'Adventure',
            'Comedy',
            'Drama',
            'Fantasy',
            'Horror',
            'Mystery',
            'Romance',
            'Sci-Fi ',
            'Thriller'
        ]
    }),
    actions: {
        getCountries() {
            getCountriesApi().then(({ data }) => {
                this.countries = data
            })
        },
        getMovies() {
            this.movies = moviesJson.movies.map((item) => ({
                ...item,
                year: dayjs(item.year.toString())
            }))
        },
        getFavorites() {
            const getFavorites: string | null =
                localStorage.getItem('favorites')
            const favoritesIds: number[] = getFavorites
                ? (JSON.parse(getFavorites) as number[])
                : []
            favoritesIds.forEach((id: number) => {
                this.favorites.add(id)
            })
        },
        toggleFavorite(id: number) {
            if (this.favorites.has(id)) {
                this.favorites.delete(id)
            } else {
                this.favorites.add(id)
            }
            localStorage.setItem(
                'favorites',
                JSON.stringify([...this.favorites])
            )
        },
        createMovie(movie: Movie) {
            this.movies.push(movie)
        },
        updateMovie(id: number, movie: Movie) {
            const index = this.movies.findIndex((item: Movie) => item.id === id)
            if (index > -1) {
                this.movies[index] = movie
            }
        },
        deleteMovie(id: number) {
            const index = this.movies.findIndex((item: Movie) => item.id === id)
            if (index > -1) {
                this.movies.splice(index, 1)
            }
        }
    },
    getters: {
        getFavoriteMovies: (state: MovieState) =>
            state.movies.filter((movie) => state.favorites.has(movie.id))
    }
})

export default useMovies
