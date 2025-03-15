import axios from 'axios'
import { IApiParams } from '@/types/api.ts'

const instance = axios.create({
    baseURL: 'https://restcountries.com/v3.1/'
})
const hl = localStorage.getItem('hl') ?? 'uz'
// let refreshTokenPromise: Promise<AxiosResponse<ITokenResponse>> | null = null

export const api = ({
    url,
    method = 'GET',
    data,
    params,
    open = false,
    ...props
}: IApiParams) => {
    // let token = getToken()
    let access_token: string | undefined

    // if (token) access_token = `Bearer ${token.access_token}`
    if (!open) {
        props.headers = {
            ...props.headers,
            hl,
            Authorization:
                props.headers && props.headers.Authorization
                    ? props.headers.Authorization
                    : access_token
        }
    }
    if ('pk' in props && props.pk) {
        url = `${url}/${props.pk}`
    }
    return instance({
        url: url,
        method: method,
        params: params,
        data: data,
        ...props
    })
}

// function createAxiosResponseInterceptor() {
//     instance.interceptors.response.use(
//         (response) => response,
//         async (error) => {
//             if (error.response.status !== 401) {
//                 return Promise.reject(error)
//             }
//             if (!refreshTokenPromise) {
//                 refreshTokenPromise = refreshAccessToken()
//             }
//             try {
//                 await refreshTokenPromise
//                 return axios({
//                     ...error.response.config,
//                     headers: {
//                         ...error.response.config.headers,
//                         Authorization: `Bearer ${localStorage.getItem('access_token')}`
//                     }
//                 })
//             } catch (err) {
//                 console.log(err)
//                 console.log(error)
//                 return Promise.reject(err)
//             } finally {
//                 refreshTokenPromise = null // Reset
//             }
//         }
//     )
// }

// async function refreshAccessToken() {
//     const token = getToken()
//     if (token?.refresh_token) {
//         try {
//             let result = await AuthRefreshTokenApi(token?.refresh_token)
//             const { data } = result
//             localStorage.setItem('access_token', data.access_token)
//             localStorage.setItem('refresh_token', data.refresh_token)
//             return Promise.resolve(result)
//         } catch (error) {
//             Clear()
//             return Promise.reject(error)
//         } finally {
//             createAxiosResponseInterceptor()
//         }
//     } else {
//         Clear()
//         return Promise.reject('No token provided')
//     }
// }

// function Clear() {
//     localStorage.clear()
//     window.location.href = '/'
//     return null
// }

// createAxiosResponseInterceptor()
