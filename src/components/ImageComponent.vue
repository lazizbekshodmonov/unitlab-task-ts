<script setup lang="ts">
import { ref } from 'vue'
import IconImage from '@/components/icons/IconImage.vue'

type ImageComponentProps = {
    src?: string
    alt?: string
}
defineProps<ImageComponentProps>()

const isLoaded = ref<boolean>(false)
const isErrorLoad = ref<boolean>(false)

function loadImage() {
    isLoaded.value = true
}

function onError() {
    isErrorLoad.value = true
}
</script>

<template>
    <div class="w-full h-full">
        <div
            v-if="!isLoaded"
            class="w-full h-full flex items-center justify-center"
        >
            <icon-image class="text-[150px] text-muted" />
        </div>
        <img
            v-show="isLoaded"
            :src="src"
            :alt="alt"
            @load="loadImage"
            @error="onError"
        />
    </div>
</template>

<style scoped></style>
