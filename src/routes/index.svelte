<svelte:head>
	<title>Union Booth :: Home</title>
</svelte:head>

<script>
	import { stores } from '@sapper/app';
	import LiveTopic from '../components/LiveTopic.svelte';

	const { session } = stores();
</script>

{#if $session.user}
	<LiveTopic/>
{:else}
	<a href="/register">Register</a>
	<a href="/login">Login</a>
{/if}
