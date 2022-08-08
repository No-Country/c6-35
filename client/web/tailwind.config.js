/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./app/**/*.tsx',
		'./app/components/**/*.tsx',
		'./app/routes/**/*.tsx',
	],
	theme: {
		extend: {},
	},
	plugins: [require('daisyui')],
}
