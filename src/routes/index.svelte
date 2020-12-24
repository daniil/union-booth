<svelte:head>
	<title>Home</title>
</svelte:head>

<script>
	import { stores } from '@sapper/app';
	const { session } = stores();
</script>

{#if $session.user}
	<h1>User Logged In: {$session.user.email}</h1>
{:else}
	<a href="/register">Register</a>
	<a href="/login">Login</a>
{/if}
