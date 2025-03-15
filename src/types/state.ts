import { RouteLocationRaw } from 'vue-router'
import { Movie } from '@/types/movie.ts'
import { Country } from '@/types/country.ts'

export type ToastContent = {
    status: 'success' | 'error' | 'warning'
    message?: string
    locale?: string
}

export type Locale = 'uz' | 'ru' | 'en' | 'cyr'

export type CoreError = {
    response: any
    message: string
}

export interface CoreState {
    loadingKeys: Set<string>
    locale: Locale
    collapsed: boolean
    toastContent: ToastContent | null
    redirectTo: RouteLocationRaw | null
    loadingMain: boolean
    innerWidth: number
}

export type MovieState = {
    movies: Array<Movie>
    favorites: Set<number>
    countries: Array<Country>
    genres: Array<string>
}
