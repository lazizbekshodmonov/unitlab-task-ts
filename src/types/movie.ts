import { Dayjs } from 'dayjs'

export type Movie = {
    id: number
    name: string
    image: string
    description: string
    year: Dayjs
    genre: string[]
    country: string
}

export type NullableMovie = {
    [K in keyof Movie]: Movie[K] | null
}
