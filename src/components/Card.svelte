<script lang="ts">
	export let value = '';
	export let isHidden = false;
	export let title = '';
</script>

<div class="flex flex-col items-center w-auto">
	{#if !isHidden}
		<div
			class="flex items-center justify-center w-16 h-24 p-5 bg-gray-100 rounded-md mt-5 overflow-hidden text-gray-900"
		>
			<h2 class="text-2xl font-bold">{value}</h2>
		</div>
	{:else}
		<div
			class="flex items-stretch justify-center w-16 h-24 p-0 bg-gray-100 rounded-md mt-5 overflow-hidden text-gray-900"
		>
			<div class="flex-1 h-full bg-green-300" />
			<div class="flex-1 h-full bg-green-200" />
			<div class="flex-1 h-full bg-green-300" />
			<div class="flex-1 h-full bg-green-200" />
			<div class="flex-1 h-full bg-green-300" />
			<div class="flex-1 h-full bg-green-200" />
			<div class="flex-1 h-full bg-green-300" />
		</div>
	{/if}
	{#if title}
		<h3 class="mt-2 text-lg font-semibold">{title}</h3>
	{/if}
</div>
