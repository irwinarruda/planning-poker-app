<script lang="ts">
	export let label: string | undefined;
	export let name = '';
	export let placeholder = '';
	export let type: 'text' | 'password' | 'email' | 'number' = 'text';
	export let className: string | undefined = undefined;
	export let value = '';
	export let onInput:
		| ((
				e: Event & {
					currentTarget: EventTarget & HTMLInputElement;
				}
		  ) => void)
		| undefined = undefined;
</script>

<div class={className}>
	{#if label}
		<label for={name} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
			{label}
		</label>
	{/if}
	<input
		class="bg-gonInputray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-blue-500"
		on:input={onInput}
		id={name}
		{value}
		{type}
		{name}
		{placeholder}
	/>
</div>
