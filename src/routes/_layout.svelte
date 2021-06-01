<script>
	import { stores } from '@sapper/app';
	import { onDestroy } from 'svelte';
	import { setClient } from 'svelte-apollo';
	import initApolloClient from 'graphql/client';
	import Nav from 'components/Nav.svelte';
	import Footer from 'components/Footer.svelte';

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
	.page-container {
		position: relative;
		min-height: 100vh;
	}
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em 2em 6em 2em;
		margin: 0 auto;
		box-sizing: border-box;
		z-index: 1;
	}
</style>

<div class="page-container">
	<Nav {segment}/>
	<main>
		<slot></slot>
	</main>
	<Footer/>
</div>
