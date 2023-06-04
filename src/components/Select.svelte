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
		<label for={name} class="block mb-2 text-sm font-medium text-gray-900">
			{label}
		</label>
	{/if}
	<select
		class="bg-gonInputray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 outline-2 focus:-outline-offset-1 focus:outline block w-full p-2.5 outline-blue-500"
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
