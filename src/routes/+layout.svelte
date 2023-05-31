<script lang="ts">
	import { onDestroy } from 'svelte';
	import { io } from 'socket.io-client';
	import { PlanningPokerStore } from '~/providers/PlanningPokerStore.ts';
	import type { User } from '~/entities/User.ts';
	import type { Room } from '~/entities/Room.ts';
	import type { SocketResponse } from '~/entities/SocketResponse.ts';
	import '../app.css';

	const socket = io();
	const clearSocket = socket.on('connect', () => {
		PlanningPokerStore.update((prevState) => ({
			...prevState,
			socket
		}));
		socket.on('createdUser', ({ data }: SocketResponse<User>) => {
			PlanningPokerStore.update((prevState) => ({
				...prevState,
				user: data as User
			}));
		});
		socket.on('joinRoom', ({ status, data }: SocketResponse<Room>) => {
			console.log('here');
			if (status === 'error') {
				alert(data);
				return;
			}
			PlanningPokerStore.update((prevState) => ({
				...prevState,
				room: data as Room
			}));
		});
		socket.on('disconnect', () => {
			PlanningPokerStore.update((_) => ({
				room: null,
				user: null,
				socket: null
			}));
		});
	});
	const clearStore = PlanningPokerStore.subscribe((state) => {
		console.log('state', state);
	});
	onDestroy(() => {
		clearStore();
		clearSocket.disconnect();
	});
</script>

<section class="w-screen h-screen bg-green-900 text-gray-100 relative">
	<div class="w-1/4 m-auto pt-16">
		<slot />
	</div>
</section>
