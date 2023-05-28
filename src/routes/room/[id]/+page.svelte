<script lang="ts">
	import Button from '~/components/Button.svelte';
	import Card from '~/components/Card.svelte';
	export let data;
	console.log('data', data);
</script>

<h1 class="text-center text-4xl font-bold">Sala {data.id}</h1>
<div class="w-full flex items-center justify-center gap-3 flex-wrap">
	<Card title="Felipe Moreira" value="5" isHidden={true} />
	<Card title="Irwin Arruda" value="5" />
	<Card title="Guilherme Mota" value="5" />
	<Card title="Lara Portilho" value="5" />
	<Card title="Felipe Moreira" value="5" isHidden={true} />
</div>
<div
	class="flex items-center justify-center w-full h-24 p-5 bg-gray-100 rounded-md mt-5 overflow-hidden text-gray-900"
>
	<Button>Reveal cards</Button>
</div>
<div class="absolute bottom-0 left-0 w-screen bg-gray-300">Hello</div>
