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
			backgroundColor: {
				lightBlue: '#afc5db',
				extraLightBlue: '#dbe1f0',
			},
			textColor: {
				darkBlue: '#2F4861',
				extraDarkBlue: '#2B4075',
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
export default config;
