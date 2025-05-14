/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./resources/**/*.blade.php",
      "./resources/**/*.js",
      "./resources/**/*.jsx",
      "./resources/**/*.ts",
      "./resources/**/*.tsx",
    ],
    theme: {
      extend: {
        colors: require('tailwindcss/colors'),
      },
    },
    // Preserve all of Tailwind's default colors
    experimental: {
      preserveDefaultColors: true,
      cssCallable: true,
    },
};
