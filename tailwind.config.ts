import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./content/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./public/**/*.svg',
	],
	darkMode: ['class'],
	theme: {
		extend: {},
	},
	plugins: [require('@tailwindcss/typography')],
};
export default config;
