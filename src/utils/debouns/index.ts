const timeouts: Record<string, ReturnType<typeof setTimeout>> = {}

const clearDebounce = (key: string) => {
    if (timeouts[key]) {
        clearTimeout(timeouts[key])
        delete timeouts[key]
    }
}

export const debounce = (key: string, fn: () => void, timeout = 500) => {
    clearDebounce(key)

    timeouts[key] = setTimeout(() => {
        try {
            fn()
        } catch (e) {
            console.error('Debounce function error:', e)
        }

        delete timeouts[key]
    }, timeout)
}
