import { useI18n } from 'vue-i18n'
import { Rule } from 'ant-design-vue/es/form'
import { passwordPatternAndMessages } from '@/utils/constants/pattern.constants.ts'

function useRules() {
    const { t } = useI18n()

    const required = {
        required: true,
        message: t('validations.required_field'),
        trigger: 'blur'
    }
    const password_rule: Rule = {
        validator: (_rule: Rule, value: string) => {
            if (!value) {
                return Promise.resolve()
            }
            for (const patternMessage of passwordPatternAndMessages) {
                if (!RegExp(patternMessage.pattern).test(value)) {
                    return Promise.reject(
                        t(`validations.${patternMessage.message}`)
                    )
                }
            }
            return Promise.resolve()
        }
    }
    const phone_number_rule = {
        validator: (_rule: Rule, value: string) => {
            if (!value) {
                return Promise.resolve()
            } else if (value.length === 17) {
                return Promise.resolve()
            } else {
                return Promise.reject(t('validations.invalid_phone_number'))
            }
        }
    }
    return {
        required,
        password_rule,
        phone_number_rule
    }
}

export default useRules
