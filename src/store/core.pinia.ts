import { defineStore } from 'pinia'
import type { CoreState } from '@/types/state.ts'
import { CoreError, Locale, ToastContent } from '@/types/state.ts'
import { RouteLocationRaw } from 'vue-router'

const useCore = defineStore('Core', {
    state: (): CoreState => ({
        loadingKeys: new Set<string>(),
        locale: 'uz',
        collapsed: false,
        toastContent: null,
        redirectTo: null,
        loadingMain: false,
        innerWidth: window.innerWidth
    }),
    actions: {
        loading(key: string) {
            if (!this.loadingKeys.has(key)) {
                this.loadingKeys.add(key)
            } else {
                this.loadingKeys.delete(key)
            }
        },
        changeLocale(locale: Locale) {
            localStorage.setItem('lang', locale)
            this.locale = locale
            this.loadingMain = true
            setTimeout(() => {
                this.loadingMain = false
            })
        },
        collapse() {
            this.collapsed = !this.collapsed
        },
        setToast(obj: ToastContent) {
            this.toastContent = obj
        },
        redirect(key: RouteLocationRaw | null = null) {
            this.redirectTo = key
        },
        switchStatus(error: CoreError) {
            try {
                const { response, message = 'Error' } = error
                const status = response?.status
                const data = response?.data
                let toastMessage: ToastContent = {
                    status: 'error',
                    message: message
                }

                if (status >= 200 && status <= 300) {
                    toastMessage = {
                        locale: 'SUCCESS',
                        status: 'success'
                    }
                }
                if (status >= 400 && status < 500) {
                    if (
                        typeof data !== 'string' &&
                        'message' in data &&
                        data.message !== ''
                    ) {
                        toastMessage.message = data.message
                            ? data.message
                            : message
                    }
                    if (typeof data === 'string') {
                        toastMessage.message = data
                        toastMessage.status = 'error'
                    }
                }
                if (status >= 500) {
                    toastMessage = {
                        locale: 'notification_component.internal_server_error',
                        status: 'error'
                    }
                }
                if (status !== 401) {
                    this.setToast(toastMessage)
                }
            } catch (error) {
                this.setToast({
                    status: 'error',
                    locale: 'ERROR'
                })
            }
        }
    },
    getters: {
        isLoading: (state) => (key: string) => state.loadingKeys.has(key)
    }
})

export default useCore
