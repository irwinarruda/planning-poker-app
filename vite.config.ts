import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

import { webSocket } from './plugins/webSocket.js';
import { SocketHandler } from './server/socket.js';

export default defineConfig({
	resolve: {
		alias: {
			'~': path.resolve('./src')
		}
	},
	plugins: [sveltekit(), webSocket((io) => new SocketHandler(io))]
});
