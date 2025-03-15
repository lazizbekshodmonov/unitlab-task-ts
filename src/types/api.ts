import { AxiosRequestConfig } from 'axios'

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export interface IApiParams extends AxiosRequestConfig {
    url: string
    method?: Method
    data?: any
    params?: Record<string, any>
    open?: boolean
    pk?: string | number
}
