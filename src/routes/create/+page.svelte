<script lang="ts">
	import type { Socket } from 'socket.io-client';
	import { PlanningPokerStore } from '~/providers/PlanningPokerStore';
	import Button from '~/components/Button.svelte';
	import TextField from '~/components/TextField.svelte';

	let socket: Socket;
	PlanningPokerStore.subscribe((state) => {
		socket = state.socket!;
	});

	let userName = '';
	let roomName = '';
	let roomCards = '';

	function onSubmit(e: Event) {
		e.preventDefault();
		socket.emit('createRoom', {
			userName,
			roomName,
			roomCards
		});
	}
</script>

<h1 class="text-center text-4xl font-bold">Planning Pocker App</h1>
<form
	class="w-full p-5 bg-gray-100 rounded-md mt-5 overflow-hidden text-gray-900"
	on:submit={onSubmit}
>
	<h2 class="text-2xl font-semibold">Create Room</h2>
	<TextField
		className="mt-3"
		label="Username"
		name="userName"
		value={userName}
		onInput={(e) => (userName = e.currentTarget.value)}
	/>
	<TextField
		className="mt-2"
		label="Room Name"
		name="roomName"
		value={roomName}
		onInput={(e) => (roomName = e.currentTarget.value)}
	/>
	<TextField
		className="mt-2"
		label="Room Cards"
		name="roomCards"
		value={roomCards}
		onInput={(e) => (roomCards = e.currentTarget.value)}
	/>
	<Button type="submit" className="w-full mt-5 mx-auto">Entrar</Button>
	<div class="flex justify-center">
		<a href="/join" class="mx-auto ext-center text-sm text-blue-600 font-semibold underline">
			Create room
		</a>
	</div>
</form>
