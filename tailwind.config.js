/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: ["./*.{html,js}"],
    content: ["./*.{html,js}"],
    plugins: [],
    theme: {
      extend: {
        fontFamily: {
          'Inter': ['"Inter"', 'cursive'],
        },
      },
    },
}
