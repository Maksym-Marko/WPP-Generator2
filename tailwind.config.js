/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,php}",
        "!./node_modules",
        "!./build",
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                13: 'repeat(13, minmax(0, 1fr))',
                14: 'repeat(14, minmax(0, 1fr))',
                15: 'repeat(15, minmax(0, 1fr))',
                16: 'repeat(16, minmax(0, 1fr))',
                17: 'repeat(17, minmax(0, 1fr))',
                18: 'repeat(18, minmax(0, 1fr))',
                19: 'repeat(19, minmax(0, 1fr))',
                20: 'repeat(20, minmax(0, 1fr))',
            },
            gridColumn: {
                'span-13': 'span 13 / span 13',
                'span-14': 'span 14 / span 14',
                'span-15': 'span 15 / span 15',
                'span-16': 'span 16 / span 16',
                'span-17': 'span 17 / span 17',
                'span-18': 'span 18 / span 18',
                'span-19': 'span 19 / span 19',
                'span-20': 'span 20 / span 20',
            },
        },
        screens: {
            'xs': '30rem',     // 480px
            'sm': '40rem',     // 640px
            'md': '48rem',     // 768px
            'lg': '62rem',     // 992px
            'xl': '75rem',     // 1200px
            'xxl': '85rem',    // 1360px
        },
    },
    plugins: [],
}