export function getToken() {
    const access_token = localStorage.getItem('access_token')
    const access_expires = localStorage.getItem('access_expires')
    const refresh_token = localStorage.getItem('refresh_token')
    const refresh_expires = localStorage.getItem('refresh_expires')
    return {
        access_token,
        access_expires,
        refresh_token,
        refresh_expires
    }
}

// export const getToken: Token = () =>
