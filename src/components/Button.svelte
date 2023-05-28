<script lang="ts">
	import { mergeClassNames } from '~/utils/mergeClassNames';

	export let className: string | undefined = undefined;
	export let type: 'button' | 'submit' | 'reset' = 'button';
</script>

<button
	class={mergeClassNames(
		'block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
		className
	)}
	{type}
>
	<slot />
</button>
