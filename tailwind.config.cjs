/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				gilroylight: ['Gilroy-Light', 'sans-serif'],
				gilroyextrabold: ['Gilroy-ExtraBold', 'sans-serif'],
			},
			backgroundColor: {
				'darkmode': '#1a1c1e'
			},
		},
	},
	plugins: [],
}
