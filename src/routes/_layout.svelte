<script context="module">
  export async function preload(_, session) {
    return {
			session
		};
  }
</script>

<script>
	import { setClient } from 'svelte-apollo';
	import initApolloClient from '../graphql/client';
	import Nav from '../components/Nav.svelte';

	export let segment;
	export let session;

	const apolloClient = initApolloClient(session);

	setClient(apolloClient);
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