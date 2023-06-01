<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { io } from 'socket.io-client';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { User } from '~/entities/User.ts';
	import type { Room } from '~/entities/Room.ts';
	import type { SocketResponse } from '~/entities/SocketResponse.ts';
	import { PlanningPokerStore } from '~/providers/PlanningPokerStore.ts';
	import '../app.css';

	let clearFn: () => void;
	onMount(() => {
		const socket = io();
		const clearSocket = socket.on('connect', () => {
			let currentPage = '';
			const clearPage = page.subscribe((state) => (currentPage = state.route.id || ''));
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
				if (status === 'error') {
					alert(data);
					return;
				}
				PlanningPokerStore.update((prevState) => ({
					...prevState,
					room: data as Room
				}));
				goto(`/room/${(data as Room).id}`);
			});
			socket.on('deletedRoom', () => {
				PlanningPokerStore.update((_) => ({
					room: null,
					user: null,
					socket: null
				}));
				if (currentPage.startsWith('/room')) {
					goto('/create');
				}
			});
			socket.on('disconnect', () => {
				PlanningPokerStore.update((_) => ({
					room: null,
					user: null,
					socket: null
				}));
				clearPage();
			});
		});
		clearFn = clearSocket.disconnect;
	});
	onDestroy(() => clearFn?.());
</script>

<section class="w-screen h-screen bg-green-900 text-gray-100 relative">
	<div class="w-1/4 m-auto pt-16">
		<slot />
	</div>
</section>
