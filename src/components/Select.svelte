<script lang="ts">
	export let options: { label: string; value: string }[] = [];
	export let label: string | undefined;
	export let value = '';
	export let name = '';
	export let placeholder = '';
	export let className: string | undefined = undefined;
</script>

<div class={className}>
	{#if label}
		<label for={name} class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
			{label}
		</label>
	{/if}
	<select
		class="bg-gonInputray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 focus:border-2 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-blue-500"
		bind:value
		id={name}
		{name}
		{placeholder}
	>
		{#each options as option}
			<option value={option.value}>
				{option.label}
			</option>
		{/each}
	</select>
</div>
