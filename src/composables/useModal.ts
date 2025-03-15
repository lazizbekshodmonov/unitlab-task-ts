import { reactive, ref } from 'vue'

interface IOpenArgs {
    title: string
    width?: number
    closable?: boolean
    component: string | object
    props?: { modalKey?: number; [key: string]: any }
    emits?: object
}
const modal = reactive<{
    list: IOpenArgs[]
    visible: Set<number>
}>({
    list: [],
    visible: new Set([])
})
const timeout = ref()

function useModal() {
    const open = ({
        title,
        width,
        closable = false,
        component,
        props,
        emits
    }: IOpenArgs) => {
        const modalKey: number = Date.now()
        modal.list.push({
            title,
            width,
            closable,
            props: { ...props, modalKey: modalKey },
            emits,
            component
        })
        modal.visible.add(modalKey)
    }

    const close = (key?: number) => {
        if (timeout.value) {
            clearTimeout(timeout.value)
        }
        modal.visible.delete(key!)
        timeout.value = setTimeout(() => {
            const index = modal.list.findIndex(
                (item) => item.props?.modalKey === key
            )
            if (index !== -1) {
                modal.list.splice(index, 1)
            }
            clearTimeout(timeout.value)
        }, 400)
    }
    return { open, close, modal }
}

export default useModal
