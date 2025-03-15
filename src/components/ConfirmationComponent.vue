<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ButtonProps } from 'ant-design-vue'
import IconCheckCircle from '@/components/icons/IconCheckCircle.vue'
import IconInfoCircle from '@/components/icons/IconInfoCircle.vue'
import { useI18n } from 'vue-i18n'

withDefaults(
    defineProps<{
        title?: string
        description?: string
        okText?: string | null
        cancelText?: string | null
        canselButtonProps?: ButtonProps
        okButtonProps?: ButtonProps
        type: 'error' | 'success' | 'warning'
    }>(),
    {
        type: 'success'
    }
)
const emits = defineEmits(['cancel', 'confirm'])
const { t } = useI18n()

const defaultTitle = reactive({
    error: t('ERROR'),
    success: t('SUCCESS'),
    warning: t('WARNING')
})
const open = ref<boolean>(false)

function confirm() {
    open.value = false
    setTimeout(() => {
        emits('confirm')
    }, 400)
}

function cancel() {
    open.value = false
    setTimeout(() => {
        emits('cancel')
    }, 400)
}
</script>

<template>
    <div @click="open = true">
        <slot />
    </div>
    <a-modal v-model:open="open" centered width="400px">
        <div
            class="w-full min-h-[150px] flex flex-col items-center justify-center"
        >
            <div
                class="w-12 h-12 flex items-center justify-center rounded text-2xl mb-2"
                :class="[
                    {
                        success: type === 'success',
                        warning: type === 'warning',
                        error: type === 'error'
                    }
                ]"
            >
                <icon-check-circle v-if="type === 'success'" />
                <icon-info-circle
                    v-if="type === 'warning' || type === 'error'"
                />
            </div>
            <h2 class="text-3xl font-semibold text-center">
                {{ title ?? defaultTitle[type] }}
            </h2>
            <p v-if="description" class="text-center text-muted">
                {{ description }}
            </p>
        </div>
        <template #footer>
            <div
                class="flex items-center justify-center flex-col px-10 gap-2"
                :class="cancelText && okText ? 'w-full' : '!px-8'"
            >
                <a-button
                    @click="confirm"
                    v-if="okText"
                    class="!justify-center"
                    :class="cancelText && okText ? 'w-full' : '!px-8'"
                    v-bind="okButtonProps"
                >
                    {{ okText }}
                </a-button>
                <a-button
                    @click="cancel"
                    v-if="cancelText"
                    class="!justify-center"
                    :class="cancelText && okText ? 'w-full' : '!px-8'"
                    v-bind="canselButtonProps"
                >
                    {{ cancelText }}
                </a-button>
            </div>
        </template>
    </a-modal>
</template>

<style scoped lang="scss">
.ok-btn {
    margin-inline-start: 0 !important;
}

.success {
    @apply bg-green-100 text-primary;
}

.warning {
    @apply bg-amber-100 text-yellow;
}

.error {
    @apply bg-rose-100 text-red;
}
</style>
