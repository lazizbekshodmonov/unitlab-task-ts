import { createRouter, createWebHistory, Router } from 'vue-router'
import routes from '@/router/navigations.ts'

const router: Router = createRouter({
    history: createWebHistory(),
    routes
})

const routerFactory = (i18n: any) => {
    router.beforeEach(async (to, _from, next) => {
        document.title = i18n.t(`document_title.${String(to.name)}`)
        next()
    })
    return router
}
export default routerFactory
