<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { usePlanningPokerStore } from '~/providers/PlanningPokerStore.ts';
	import '../app.css';

	let store = usePlanningPokerStore();
	let clearFn: () => void;
	onMount(() => {
		clearFn = store.connect();
	});
	onDestroy(() => clearFn?.());
</script>

<section class="w-screen h-screen bg-green-900 text-gray-100 relative">
	<div class="max-w-md w-full m-auto pt-16 px-10">
		<slot />
	</div>
</section>
