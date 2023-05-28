<script lang="ts">
	import Button from '~/components/Button.svelte';
	import TextField from '~/components/TextField.svelte';
	let name = '';
	let password = '';
</script>

<h1 class="text-center text-4xl font-bold">Planning Pocker App</h1>
<section class="w-full p-5 bg-gray-100 rounded-md mt-5 overflow-hidden text-gray-900">
	<h2 class="text-2xl font-semibold">Join room</h2>
	<TextField
		className="mt-3"
		label="Room Name"
		name="name"
		value={name}
		onInput={(e) => (name = e.currentTarget.value)}
	/>
	<TextField
		type="password"
		className="mt-2"
		name="password"
		label="Room Password"
		value={password}
		onInput={(e) => (password = e.currentTarget.value)}
	/>
	<Button type="submit" className="w-full mt-5 mx-auto">Join</Button>
	<div class="flex justify-center">
		<a href="/create" class="mx-auto ext-center text-sm text-blue-600 font-semibold underline">
			Create room
		</a>
	</div>
</section>
