<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { mergeClassNames } from '~/utils/mergeClassNames';

	const dispatch = createEventDispatcher();

	export let className: string | undefined = undefined;
	export let type: 'button' | 'submit' | 'reset' = 'button';
</script>

<button
	class={mergeClassNames(
		'block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center',
		className
	)}
	{type}
	on:click={() => dispatch('click')}
>
	<slot />
</button>
