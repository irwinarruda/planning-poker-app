import { redirect } from '@sveltejs/kit';

export function load({ params, cookies }) {
	if (cookies.get('isPlaying')) {
		cookies.delete('isPlaying');
		return { id: params.id };
	}
	throw redirect(307, `/join?id=${params.id}`);
}
