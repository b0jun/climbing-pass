import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
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
			},
			keyframes: {
				['bottom-sheet-up']: {
					'0%': { transform: 'translateY(320px)' },
					'100%': { transform: 'translateY(0)' },
				},
				['bottom-sheet-down']: {
					'0%': { transform: 'translateY(0)' },
					'100%': { transform: 'translateY(320px)' },
				},
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
