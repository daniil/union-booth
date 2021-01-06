<script>
	import ApolloClient from "apollo-client";
	import { WebSocketLink } from 'apollo-link-ws';
	import { HttpLink } from 'apollo-link-http';
	import { split } from 'apollo-link';
	import { getMainDefinition } from 'apollo-utilities';
	import { InMemoryCache } from 'apollo-cache-inmemory';
	import WebSocket from 'isomorphic-ws';
	import fetch from 'isomorphic-unfetch';
	import { setClient } from 'svelte-apollo';
	import Nav from '../components/Nav.svelte';

	export let segment;

	const httpLink = new HttpLink({
		uri: 'http://localhost:3000/graphql'
	});

	const wsLink = new WebSocketLink({
		uri: 'ws://localhost:3000/graphql',
		options: {
			reconnect: true
		},
		webSocketImpl: WebSocket
	});

	const splitLink = split(
		({ query }) => {
			const definition = getMainDefinition(query);
			return (
				definition.kind === 'OperationDefinition' &&
				definition.operation === 'subscription'
			);
		},
		wsLink,
		httpLink,
	);

	const apolloClient = new ApolloClient({
		name: 'Union Booth',
		link: splitLink,
		cache: new InMemoryCache(),
		fetch,
		credentials: 'include'
	});
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