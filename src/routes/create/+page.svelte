<script lang="ts">
	import { serialize } from 'cookie';
	import { usePlanningPokerStore } from '~/providers/PlanningPokerStore';
	import Button from '~/components/Button.svelte';
	import TextField from '~/components/TextField.svelte';
	import Select from '~/components/Select.svelte';

	let store = usePlanningPokerStore();
	$: socket = $store.socket;

	let roomCardsOptions = [
		{ label: 'Irwin: 1, 2, 3, 4, 5', value: '1,2,3,4,5' },
		{ label: 'Fibonacci 0, 1, 2, 3, 5, 8, 13, 21, 34, 55', value: '0,1,2,3,5,8,13,21,34,55' }
	];

	let playerName = '';
	let roomName = '';
	let roomCards = '';

	function onSubmit(e: Event) {
		e.preventDefault();
		document.cookie = serialize('isPlaying', 'true', {
			path: '/',
			maxAge: 60 * 60 * 24 * 7
		});
		socket!.emit('createRoom', {
			playerName,
			roomName,
			roomCards
		});
	}
</script>

<svelte:head>
	<title>Planning Poker | Create</title>
</svelte:head>
<h1 class="text-center text-4xl font-bold">Planning Poker App</h1>
<form
	class="w-full p-5 bg-gray-100 rounded-md mt-5 overflow-hidden text-gray-900"
	on:submit={onSubmit}
>
	<h2 class="text-2xl font-semibold">Create Room</h2>
	<TextField className="mt-3" label="Player Name" name="playerName" bind:value={playerName} />
	<TextField className="mt-2" label="Room Name" name="roomName" bind:value={roomName} />
	<Select className="mt-2" label="Room Cards" options={roomCardsOptions} bind:value={roomCards} />
	<Button type="submit" className="w-full mt-5 mx-auto">Entrar</Button>
	<div class="flex justify-center">
		<a href="/join" class="mx-auto ext-center text-sm text-blue-600 font-semibold underline">
			Create room
		</a>
	</div>
</form>
