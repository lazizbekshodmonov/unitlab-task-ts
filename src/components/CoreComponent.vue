<script setup lang="ts">
import useCore from '@/store/core.pinia.ts'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { h, watch } from 'vue'
import { Button, notification } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import AppModalComponent from '@/components/AppModalComponent.vue'

const { t } = useI18n()
const router = useRouter()
const corePinia = useCore()
const { redirectTo, toastContent } = storeToRefs(corePinia)

watch(redirectTo, () => {
    if (redirectTo.value) {
        router.push(redirectTo.value)
    }
})

watch(toastContent, () => {
    const key = `open${Math.random()}`
    if (toastContent.value) {
        const toastMessage = toastContent.value?.message
        const type = toastContent.value?.status || 'success'
        const localeMessage = toastContent.value?.locale

        notification.open({
            message: t(`notification_component.${type}`),
            description: toastMessage ? toastMessage : t(`${localeMessage}`),
            duration: 10,
            btn: () =>
                h(
                    Button,
                    {
                        size: 'large',
                        class: 'px-4',
                        onClick: () => notification.close(key)
                    },
                    { default: () => 'Ok' }
                ),
            key,
            class: `notification-custom-class notification-${type}`
        })
    }
})
</script>

<template>
    <slot />
    <app-modal-component />
</template>

<style scoped></style>
