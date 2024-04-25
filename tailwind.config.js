/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./views/*.pug",
      "./public/javascripts/*.js",
    ],
    theme: {
      extend: {
        gridTemplateColumns: {
          "dashboard": "2fr 1fr",
          "message": "1fr 200px",
        },
        spacing: {
          "screen": "1980px",
        }
      },
    },
    plugins: [],
}