const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        './**/*.{php,html}',
        './src/**/*.{js,jsx,ts,tsx,php}',
        '!./node_modules',
    ],
    safelist: [],
    theme: {
        extend: {
            colors: {
                bright: '#52e6a5',
                'main-dark': '#433abf',
                'main-light': '#f5f5f5',
                main: '#4c40d4',
                dark: '#222a35',
                light: '#ffffff',
            },
            fontFamily: {},
            screens: {
                xs: '480px',
                sm: '768px',
                md: '992px',
                lg: '1200px',
                xl: '1360px',
                desktop: '1440px',
            },
            container: {
                center: true,
                padding: '2.2rem',
                screens: {
                    desktop: '1440px',
                },
            },
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
    },
    plugins: [],
};
