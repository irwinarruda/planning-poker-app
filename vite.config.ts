import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

import { webSocket } from './plugins/webSocket.js';
import { handleSocket } from './server/socket.js';

export default defineConfig({
	resolve: {
		alias: {
			'~': path.resolve('./src')
		}
	},
	plugins: [sveltekit(), webSocket(handleSocket)]
});
