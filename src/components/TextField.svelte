<script lang="ts">
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
	<input
		class="bg-gonInputray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-blue-500"
		bind:value
		type="text"
		id={name}
		{name}
		{placeholder}
	/>
</div>
