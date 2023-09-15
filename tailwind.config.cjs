/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			textShadow: {
				DEFAULT: '3px 4px 0px rgba(0, 0, 0, 0.25);',
			},
		},
	},
	plugins: [],
}
