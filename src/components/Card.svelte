<script lang="ts">
	import { mergeClassNames } from '~/utils/mergeClassNames';
	export let value = '';
	export let isHidden = false;
	export let isSelected = false;
	export let isDisabled = false;
	export let title = '';
	export let size: 'md' | 'sm' = 'md';
	export let className: string | undefined = undefined;
	export let onClick: (() => void) | undefined = undefined;
	let classNames = mergeClassNames(
		'flex items-center justify-center bg-gray-100 rounded-md overflow-hidden text-gray-900 outline-none transition-all',
		'aria-checked:border-4 aria-checked:border-green-500 aria-checked:bg-green-500 aria-checked:shadow-base aria-checked:shadow-green-500 aria-checked:text-white aria-checked:hover:bg-green-500',
		'aria-hidden:p-5',
		size === 'md' && 'w-16 h-24',
		size === 'sm' && 'w-10 h-16',
		isDisabled &&
			'aria-disabled:text-white aria-disabled:bg-gray-400 aria-disabled:cursor-not-allowed aria-disabled:hover:bg-gray-400 aria-disabled:focus:bg-gray-500',
		!isDisabled &&
			`${
				!isSelected ? 'clickable:hover:bg-green-100 clickable:focus:bg-green-100 ' : ''
			}clickable:hover:border-4 clickable:hover:border-green-500 clickable:hover:shadow-base clickable:hover:shadow-green-500 clickable:focus:border-4 clickable:focus:border-green-500 clickable:focus:shadow-base clickable:focus:shadow-green-500`,
		className
	);
</script>

<div class="flex flex-col items-center w-auto">
	{#if !isHidden}
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div
			class={classNames}
			on:click={onClick}
			role={onClick ? 'button' : undefined}
			tabindex={onClick ? 0 : undefined}
			aria-checked={isSelected}
			aria-hidden={isHidden}
			aria-disabled={isDisabled}
		>
			<h2 class="text-2xl font-bold">{value}</h2>
		</div>
	{:else}
		<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
		<div
			class={classNames}
			on:click={onClick}
			role={onClick ? 'button' : undefined}
			tabindex={onClick ? 0 : undefined}
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
		<h3 class={`mt-2 text-${size === 'md' ? 'lg' : 'sm'} font-semibold`}>{title}</h3>
	{/if}
</div>
