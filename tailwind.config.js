/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                red: '#FF3B30',
                yellow: '#FFA500',
                muted: '#9BA2B1',
                primary: '#5a6acf',
                light: '#F1F2F4',
                dark: '#2E3035'
            }
        }
    },
    plugins: []
}
