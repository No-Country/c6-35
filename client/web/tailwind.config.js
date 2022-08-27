/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.tsx',
		'./app/components/**/*.tsx',
		'./app/routes/**/*.tsx',
	],
	theme: {
		extend: {},
		colors: {
			"app-w-primary": "#FCBA11",
			"app-w-primary-pale": "#FFFCF6",
			"app-w-secodary": "#252B42",
			"app-w-write-back": "#FAFAFD",
			"app-w-write": "#fff",
			"app-w-write-ash": "#8D99AE",
			"app-w-write-gris": "#F6F6FB",
			"app-msj-accepted": "#61FFA0",
			"app-msj-accepted-pale": "#DEFFEB",
			"app-msj-danger": "#FF6161",
			"app-msj-danger-pale": "#FFDEDE",
			"app-msj-warning": "#FFD361",
			"app-msj-warning-pale": "#FFF8DE",
		}
	},
	plugins: [require('daisyui')],
}
