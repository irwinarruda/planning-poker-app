<script lang="ts">
	import type { Socket } from 'socket.io-client';
	import { serialize } from 'cookie';
	import { PlanningPokerStore } from '~/providers/PlanningPokerStore';
	import Button from '~/components/Button.svelte';
	import TextField from '~/components/TextField.svelte';
	export let data;

	let socket: Socket;
	PlanningPokerStore.subscribe((state) => {
		socket = state.socket!;
	});

	let playerName = '';
	let roomId = data.id || '';

	function onSubmit(e: Event) {
		e.preventDefault();
		document.cookie = serialize('isPlaying', 'true', {
			path: '/',
			maxAge: 60 * 60 * 24 * 7
		});
		socket.emit('joinRoom', {
			playerName,
			roomId
		});
	}
</script>

<h1 class="text-center text-4xl font-bold">Planning Pocker App</h1>
<form
	class="w-full p-5 bg-gray-100 rounded-md mt-5 overflow-hidden text-gray-900"
	on:submit={onSubmit}
>
	<h2 class="text-2xl font-semibold">Join room</h2>
	<TextField className="mt-3" label="Player Name" name="playerName" bind:value={playerName} />
	<TextField className="mt-3" label="Room Id" name="roomId" bind:value={roomId} />
	<Button type="submit" className="w-full mt-5 mx-auto">Join</Button>
	<div class="flex justify-center">
		<a href="/create" class="mx-auto ext-center text-sm text-blue-600 font-semibold underline">
			Create room
		</a>
	</div>
</form>
