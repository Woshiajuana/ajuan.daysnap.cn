function withOpacity(cssVariable) {
  return ({ opacityValue }) => {
    return `rgba(var(${cssVariable}), ${opacityValue})`
  }
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: withOpacity('--bee-primary-color'),
      },

      maxWidth: {
        main: '960px',
      },

      backgroundColor: {
        'base-color': withOpacity('--ds-bg-base-color'),
        'base-muted-color': withOpacity('--ds-bg-base-muted-color'),
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
