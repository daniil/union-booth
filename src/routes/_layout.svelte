<script>
	import { stores } from '@sapper/app';
	import { onDestroy } from 'svelte';
	import { setClient } from 'svelte-apollo';
	import initApolloClient from 'graphql/client';
	import Nav from 'components/Nav.svelte';

	export let segment;

	const { session } = stores();

	const apolloClient = initApolloClient($session);
	setClient(apolloClient);

	if (!process.browser) {
		onDestroy(() => {
			$session.apolloClient = $session.apolloClient.extract();
		});
	} else {
		apolloClient.restore($session.apolloClient);
		$session.apolloClient = apolloClient;
	}
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>