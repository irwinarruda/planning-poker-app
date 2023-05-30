<script lang="ts">
	import Button from '~/components/Button.svelte';
	import Card from '~/components/Card.svelte';
	export let data;
</script>

<h1 class="text-center text-4xl font-bold">Sala {data.id}</h1>
<div class="w-full mt-6 flex items-center justify-center gap-3 flex-wrap">
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
<div class="w-screen py-4 absolute bottom-0 left-0 bg-blue-900">
	<h4 class="text-center text-md font-medium">Chose your card!</h4>
	<div class="w-full mt-3 flex items-center gap-3 justify-center">
		<Card value="1" onClick={() => console.log(1)} isSelected />
		<Card value="2" onClick={() => console.log(2)} isDisabled />
		<Card value="3" onClick={() => console.log(3)} />
		<Card value="4" onClick={() => console.log(4)} />
		<Card value="5" onClick={() => console.log(5)} />
	</div>
</div>
