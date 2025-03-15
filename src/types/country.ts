export type Country = {
    name: CountryName
}

type CountryName = {
    common: string
    official: string
    nativeName: Record<string, { common: string; official: string }>
}
