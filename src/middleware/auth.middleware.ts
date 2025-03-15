import {
    NavigationGuardNext,
    RouteLocationNormalized,
    RouteLocationNormalizedLoaded
} from 'vue-router'
import { getToken } from '@/utils/storage/localStorage.ts'

const hasAccessRoutes = ['NotFound']

export async function authMiddleware(
    to: RouteLocationNormalized,
    _from: RouteLocationNormalizedLoaded,
    next: NavigationGuardNext
) {
    const token = getToken()
    if (token.access_token) {
        if (
            to.path.includes('dashboard') ||
            hasAccessRoutes.includes(String(to.name))
        ) {
            return next()
        } else {
            return next({ name: 'DashboardLayout' })
        }
    } else {
        if (!to.path.includes('dashboard')) {
            return next()
        } else {
            return next({ name: 'AuthLoginView' })
        }
    }
}
