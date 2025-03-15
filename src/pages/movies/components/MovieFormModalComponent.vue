<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Movie, NullableMovie } from '@/types/movie.ts'
import useRules from '@/composables/rules.ts'
import { UploadRequestOption } from 'ant-design-vue/es/vc-upload/interface'
import IconUpload from '@/components/icons/IconUpload.vue'
import useCore from '@/store/core.pinia.ts'
import IconClose from '@/components/icons/IconClose.vue'
import useMovies from '@/store/movies.pinia.ts'
import { storeToRefs } from 'pinia'
import { ModalProps } from '@/types/component.ts'
import useModal from '@/composables/useModal.ts'
import dayjs from 'dayjs'

type MovieProps = {
    movie?: Movie
}

const { t } = useI18n()
const { required } = useRules()
const { close } = useModal()

const props = defineProps<ModalProps & MovieProps>()

const coreStore = useCore()
const moviesStore = useMovies()

const { countries, genres } = storeToRefs(moviesStore)

const formRef = ref()
const form = reactive<NullableMovie>({
    id: null,
    name: null,
    image: null,
    description: null,
    genre: [],
    country: null,
    year: null
})

onMounted(() => {
    moviesStore.getCountries()
    if (props.movie) {
        form.id = props.movie.id
        form.name = props.movie.name
        form.description = props.movie.description
        form.genre = props.movie.genre
        form.image = props.movie.image
        form.country = props.movie.country
        form.year = dayjs(props.movie.year)
    }
})

function handleCustomRequest(options: UploadRequestOption) {
    const { file, onSuccess } = options
    form.image = URL.createObjectURL(file as Blob)
    if (onSuccess) onSuccess(form.image)
}

function beforeUpload(file: File) {
    const isImage = file.type.startsWith('image/')
    if (!isImage) {
        coreStore.setToast({
            status: 'error',
            message: t('MoviesView.only_images_can_be_uploaded')
        })
        return false
    }
    return true
}

function closeImage(): void {
    form.image = null
}

function onFinish(form: Movie) {
    formRef.value
        .validate()
        .then(() => {
            if (props.movie) {
                moviesStore.updateMovie(props.movie.id, form)
            } else {
                form.id = new Date().getTime()
                moviesStore.createMovie(form)
            }
            close(props.modalKey)
        })
        .catch(() => {})
}
</script>

<template>
    <a-form @finish="onFinish" ref="formRef" :model="form" layout="vertical">
        <a-row :gutter="16">
            <a-col :span="24">
                <a-form-item
                    name="name"
                    :label="t('MoviesView.movie_name')"
                    :rules="[required]"
                >
                    <a-input v-model:value="form.name" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item
                    name="description"
                    :label="t('MoviesView.movie_description')"
                    :rules="[required]"
                >
                    <a-textarea v-model:value="form.description" />
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item
                    name="genre"
                    :label="t('MoviesView.movie_genre')"
                    :rules="[required]"
                >
                    <a-select v-model:value="form.genre" mode="multiple">
                        <a-select-option
                            v-for="(item, index) in genres"
                            :key="index"
                            :value="item"
                        >
                            {{ item }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
                <a-form-item
                    name="year"
                    :label="t('MoviesView.movie_year')"
                    :rules="[required]"
                >
                    <a-date-picker
                        class="w-full"
                        v-model:value="form.year"
                        picker="year"
                    />
                </a-form-item>
            </a-col>
            <a-col :md="12" :sm="24">
                <a-form-item
                    name="country"
                    :label="t('MoviesView.movie_country')"
                    :rules="[required]"
                >
                    <a-select v-model:value="form.country">
                        <a-select-option
                            v-for="(item, index) in countries"
                            :key="index"
                            :value="item.name.common"
                        >
                            {{ item.name.common }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
            </a-col>
            <a-col :span="24">
                <a-form-item
                    name="image"
                    :label="t('MoviesView.movie_image')"
                    :rules="[required]"
                >
                    <div v-if="form.image" class="relative">
                        <a-button
                            @click="closeImage"
                            class="absolute !justify-center"
                            type="primary"
                            size="small"
                            danger
                            shape="circle"
                        >
                            <template #icon>
                                <icon-close />
                            </template>
                        </a-button>
                        <img :src="form.image" alt="" />
                    </div>
                    <a-upload-dragger
                        v-else
                        name="file"
                        :multiple="false"
                        :showUploadList="false"
                        :customRequest="handleCustomRequest"
                        :beforeUpload="beforeUpload"
                    >
                        <div
                            class="ant-upload-drag-icon text-2xl flex justify-center py-2 text-primary"
                        >
                            <icon-upload />
                        </div>
                        <p class="ant-upload-text">
                            {{
                                t(
                                    'MoviesView.click_or_drag_file_to_this_area_to_upload'
                                )
                            }}
                        </p>
                        <p class="ant-upload-hint">
                            {{ t('MoviesView.support_for_a_single_upload') }}
                            {{
                                t(
                                    'MoviesView.strictly_prohibit_from_uploading_company_data_or_other'
                                )
                            }}
                        </p>
                    </a-upload-dragger>
                </a-form-item>
            </a-col>
            <a-col :span="24" class="flex justify-end gap-2">
                <a-button @click="close(modalKey)" size="large">
                    {{ t('CLOSE') }}
                </a-button>
                <a-button html-type="submit" type="primary" size="large">
                    {{ t('SAVE') }}
                </a-button>
            </a-col>
        </a-row>
    </a-form>
</template>

<style scoped></style>
