import { api } from '@/utils/api'
import { AxiosResponse } from 'axios'
import { Country } from '@/types/country.ts'

export function getCountriesApi(): Promise<AxiosResponse<Array<Country>>> {
    return api({
        url: '/all',
        params: {
            fields: 'name'
        },
        method: 'GET',
        open: true
    })
}
