<script context="module">
  import ApolloClient from 'apollo-boost';
	import fetch from 'isomorphic-unfetch';

  export async function preload() {
    const gqlClient = new ApolloClient({
      name: 'Union Booth',
      fetch,
      credentials: 'include'
    });

    return { gqlClient };
  }
</script>

<script>
	import { setContext } from 'svelte';
	import Nav from '../components/Nav.svelte';

	export let segment;
	export let gqlClient;

	setContext('gqlClient', gqlClient);
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