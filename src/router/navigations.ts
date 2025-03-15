import NotFoundView from '@/pages/error/NotFoundView.vue'
import AppView from '@/pages/AppView.vue'
import { RouteRecordRaw } from 'vue-router'
import MoviesView from '@/pages/movies/MoviesView.vue'
import FavoritesView from '@/pages/favorites/FavoritesView.vue'

const routes: readonly RouteRecordRaw[] = [
    {
        path: '/',
        name: 'AppView',
        component: AppView,
        redirect: { name: 'MoviesView' },
        children: [
            {
                path: '/movies',
                name: 'MoviesView',
                component: MoviesView
            },
            {
                path: '/favorites',
                name: 'FavoritesView',
                component: FavoritesView
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFoundView
    }
]

export default routes
