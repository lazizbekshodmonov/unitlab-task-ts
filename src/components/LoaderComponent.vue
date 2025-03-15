<script setup lang="ts">
import IconLoader from './icons/IconLoader.vue'

withDefaults(
    defineProps<{
        loading: boolean | string | object | null
        size?: string
        wrapperClassName?: string
    }>(),
    {
        size: 'default'
    }
)
</script>

<template>
    <a-spin
        :spinning="loading"
        :wrapper-class-name="wrapperClassName"
        class="w-full !max-h-none"
        v-bind="$attrs"
    >
        <template #indicator>
            <IconLoader :size="size" />
        </template>
        <slot />
    </a-spin>
</template>
