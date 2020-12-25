<svelte:head>
	<title>Home</title>
</svelte:head>

<script>
	import { stores } from '@sapper/app';
	const { session } = stores();
	import LiveDiscourse from '../components/LiveDiscourse.svelte';
</script>

{#if $session.user}
	<LiveDiscourse/>
{:else}
	<a href="/register">Register</a>
	<a href="/login">Login</a>
{/if}
