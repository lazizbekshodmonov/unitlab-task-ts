export const passwordPatternAndMessages = [
    {
        pattern: /^.{8,}$/,
        message: 'password_length_must_be_at_least_eight_characters'
    },
    {
        pattern: /[A-Z]/,
        message: 'passwords_must_contain_at_least_one_upper_case_letter'
    },
    {
        pattern: /[a-z]/,
        message: 'passwords_must_contain_at_least_one_lower_case_letter'
    },
    {
        pattern: /[0-9]/,
        message: 'password_must_contain_at_least_one_number'
    },
    {
        pattern: /[\W_]/,
        message: 'the_password_must_contain_at_least_one_special_character'
    }
]
