<script lang="ts">
	import { io } from 'socket.io-client';
	import Button from '~/components/Button.svelte';
	import TextField from '~/components/TextField.svelte';
	let message = '';
	let userName = '';
	let roomName = '';
	let roomPassword = '';
	let roomCards = '';
	function onSubmit(e: Event) {
		e.preventDefault();
		console.log('data', {
			userName,
			roomName,
			roomPassword,
			roomCards
		});
	}

	const socket = io();
	socket.on('first', (m) => {
		message = m;
	});
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
		className="mt-3"
		label="Room Name"
		name="roomName"
		value={roomName}
		onInput={(e) => (roomName = e.currentTarget.value)}
	/>
	<TextField
		type="password"
		className="mt-2"
		name="roomPassword"
		label="Room Password"
		value={roomPassword}
		onInput={(e) => (roomPassword = e.currentTarget.value)}
	/>
	<TextField
		className="mt-2"
		label="Cards"
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
