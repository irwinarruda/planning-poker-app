import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			boxShadow: {
				base: '0 0 3px 0 rgba(34, 197, 94, 0.1)'
			},
			minWidth: {
				'1/2': '50%'
			}
		}
	},
	plugins: [
		plugin(function ({ addVariant }) {
			addVariant('clickable', '&[role="button"]');
		})
	]
};
