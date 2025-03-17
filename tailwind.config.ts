import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      screens: {
        xs: '360px',
      },
      boxShadow: {
        mobile: '0 0 20px rgba(130,130,130,0.15)',
      },
      height: {
        withoutHeader: 'calc(100% - 48px)',
      },
      colors: {
        darkBlue: '#2F4861',
        lightBlue: '#afc5db',
        extraDarkBlue: '#2B4075',
        extraLightBlue: '#dbe1f0',
        main: '#3f72af',
        error: '#BE3144',
        contents: '#f5f5f5',
        form: '#fefefe',
      },
      animation: {
        sheetUp: 'bottom-sheet-up 200ms ease-in-out',
        sheetDown: 'bottom-sheet-down 200ms ease-in-out',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
