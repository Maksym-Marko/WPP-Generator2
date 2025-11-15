module.exports = {
    plugins: {
        'tailwindcss': {},
        'autoprefixer': {},
        ...(process.env.mode === 'production' ? { cssnano: {} } : {})
    }
}