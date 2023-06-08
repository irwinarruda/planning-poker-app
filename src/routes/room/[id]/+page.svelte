<script lang="ts">
	import { usePlanningPokerStore } from '~/providers/PlanningPokerStore.ts';
	import Button from '~/components/Button.svelte';
	import Card from '~/components/Card.svelte';
	let store = usePlanningPokerStore();

	$: selectedCard = $store.selectedCard;
	$: socket = $store.socket!;
	$: room = $store.room;
	$: cards = room?.cards || [];
	$: turn = room?.turns[room?.turns.length - 1];
	$: turnPlayers = turn?.turnPlayers || [];

	function onSelectCard(card: string) {
		store.select(card);
		socket.emit('updateTurn', { card });
	}

	function onEndTurn() {
		socket.emit('endTurn');
	}

	function onStartTurn() {
		socket.emit('startTurn');
	}
</script>

<svelte:head>
	<title>Planning Poker | {room?.name || 'Room'}</title>
</svelte:head>
<h1 class="text-center text-4xl font-bold">Sala {room?.name}</h1>
<div class="w-full mt-6 flex items-center justify-center gap-3 flex-wrap">
	{#each turnPlayers as turnPlayer}
		<Card
			title={turnPlayer.player.name}
			value={turnPlayer.card}
			isDisabled={!turnPlayer.card && !turn?.isFinished}
			isHidden={!!turnPlayer.card && !turn?.isFinished}
		/>
	{/each}
</div>
<div
	class="flex items-center justify-center w-full h-36 p-5 bg-gray-100 rounded-md mt-5 overflow-hidden text-gray-900"
>
	{#if turn?.canEndTurn}
		<Button on:click={onEndTurn}>End turn</Button>
	{:else if turn?.isFinished}
		<Button className="bg-gray-700 hover:bg-gray-700" on:click={onStartTurn}>Start new turn</Button>
	{:else}
		<p class="font-normal">Pick your card!</p>
	{/if}
</div>

{#if turn?.isFinished}
	<div
		class="max-w-2xl sm:w-auto w-full mx-auto px-5 py-4 absolute bottom-0 right-2/4 translate-x-2/4 bg-blue-800 rounded-t-[50px] shadow-base shadow-blue-900"
	>
		<div class="mt-3 flex items-center gap-3 justify-center">
			{#each turn?.turnSummary as turnSummary}
				<Card title={`${turnSummary.count} votes`} value={turnSummary.card} size="sm" />
			{/each}
		</div>
	</div>
{:else}
	<div
		class="max-w-2xl sm:w-auto w-full mx-auto px-6 py-4 absolute bottom-0 right-2/4 translate-x-2/4 bg-blue-800 rounded-t-[50px] shadow-base shadow-blue-900"
	>
		<h4 class="text-center text-md font-medium">Chose your card!</h4>
		<div class="mt-3 flex items-center gap-3 overflow-x-auto">
			{#each cards as card}
				<Card
					value={card}
					isSelected={selectedCard === card}
					isDisabled={turn?.isFinished}
					onClick={() => onSelectCard(card)}
				/>
			{/each}
		</div>
	</div>
{/if}
