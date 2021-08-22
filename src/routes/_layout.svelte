<script>
	import { stores } from '@sapper/app';
	import { onDestroy } from 'svelte';
	import { setClient } from 'svelte-apollo';
	import initApolloClient from 'graphql/client';
	import Nav from 'components/layout/Nav.svelte';
	import Footer from 'components/layout/Footer.svelte';

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

<style lang="scss">
	.page-container {
		position: relative;
		min-height: 100vh;
	}
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em 0 6em 0;
		margin: 0 auto;
		box-sizing: border-box;
		z-index: 1;
		@media (min-width: 48rem) {
			padding: 2em 2em 6em 2em;
		}
	}
</style>

<div class="page-container">
	<Nav {segment}/>
	<main>
		<slot></slot>
	</main>
	<Footer/>
</div>
