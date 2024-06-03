/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#05446D',
                    light: '#eaf1ff',
                    'dark-light': 'rgba(67,97,238,.15)',
                },
                secondary: {
                    DEFAULT: '#1DA5DF',
                    light: '#ebe4f7',
                    'dark-light': 'rgb(128 93 202 / 15%)',
                },
                success: {
                    DEFAULT: '#00ab55',
                    light: '#ddf5f0',
                    'dark-light': 'rgba(0,171,85,.15)',
                },
                danger: {
                    DEFAULT: '#e7515a',
                    light: '#fff5f5',
                    'dark-light': 'rgba(231,81,90,.15)',
                },
                warning: {
                    DEFAULT: '#e2a03f',
                    light: '#fff9ed',
                    'dark-light': 'rgba(226,160,63,.15)',
                },
                info: {
                    DEFAULT: '#2196f3',
                    light: '#e7f7ff',
                    'dark-light': 'rgba(33,150,243,.15)',
                },
                dark: {
                    DEFAULT: '#3b3f5c',
                    light: '#eaeaec',
                    'dark-light': 'rgba(59,63,92,.15)',
                    subMain: '#33343e',
                    header: '#363c45'
                },
                black: {
                    DEFAULT: '#1e1f22',
                    light: '#2b2d30',
                    'dark-light': '#1e2428',
                },
                white: {
                    DEFAULT: '#c2bdbd',
                    light: '#e0e0e0',
                    dark: '#888ea8',
                },
                multiselect: {
                    remove: '#e7515a',
                    caret: '#e0e6ed',
                    caretLight: '#0e1726',
                    spinner: '#2196f3',
                },
                scrollbar: {
                    light: '#595b62',
                    thumb: '#2b3541'
                },
            },
            textColor: {
                'orange': '#f38100',
            },
            fontFamily: {
                EquitanSans: ['EquitanSans', 'serif']
            },
        },
    },
    plugins: [],
}

