<script lang="ts">
	import { usePlanningPokerStore } from '~/providers/PlanningPokerStore.ts';
	import Button from '~/components/Button.svelte';
	import Card from '~/components/Card.svelte';
	// export let data;
	let store = usePlanningPokerStore();
	$: room = $store.room;
	$: user = $store.user;

	$: cards = room?.cards || [];
	let selectedCard: string | null = null;

	function selectCard(card: string) {
		selectedCard = card;
	}
</script>

<h1 class="text-center text-4xl font-bold">Sala {room?.name}</h1>
<div class="w-full mt-6 flex items-center justify-center gap-3 flex-wrap">
	<Card title="Felipe Moreira" value="5" isHidden={true} />
	<Card title="Irwin Arruda" value="5" />
	<Card title="Guilherme Mota" value="5" />
	<Card title="Lara Portilho" value="5" />
	<Card title="Felipe Moreira" value="5" isHidden={true} />
</div>
<div
	class="flex items-center justify-center w-full h-36 p-5 bg-gray-100 rounded-md mt-5 overflow-hidden text-gray-900"
>
	{#if !!selectedCard}
		<Button>Reveal cards</Button>
	{:else}
		<p class="font-normal">Pick your cards!</p>
	{/if}
	<!-- <Button className="bg-gray-700 hover:bg-gray-700">Start new voting</Button> -->
</div>
<div
	class="min-w-1/2 mx-auto px-16 py-4 absolute bottom-0 right-2/4 translate-x-2/4 bg-blue-800 rounded-t-[1000px] shadow-base shadow-blue-900"
>
	<h4 class="text-center text-md font-medium">Chose your card!</h4>
	<div class="w-full mt-3 flex items-center gap-3 justify-center">
		{#each cards as card}
			<Card value={card} isSelected={selectedCard === card} onClick={() => selectCard(card)} />
		{/each}
	</div>
</div>
<!-- <div
	class="min-w-1/2 mx-auto px-16 py-4 absolute bottom-64 right-2/4 translate-x-2/4 bg-blue-800 rounded-t-[1000px] shadow-base shadow-blue-900"
>
	<div class="w-full mt-3 flex items-center gap-3 justify-center">
		<Card title="1 vote" value="1" size="sm" />
		<Card title="1 vote" value="2" size="sm" />
		<Card title="1 vote" value="3" size="sm" />
		<Card title="1 vote" value="4" size="sm" />
		<Card title="1 vote" value="5" size="sm" />
	</div>
</div> -->
