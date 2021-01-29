<svelte:head>
	<title>Union Booth :: Home</title>
</svelte:head>

<script>
	import { stores } from '@sapper/app';
	import LiveTopic from '../components/LiveTopic.svelte';

	const { session } = stores();
</script>

<style>
	.actions {
		display: flex;
		justify-content: center;
	}
	a {
		padding: 0 1rem;
		font-size: 1.5rem;
	}
</style>

{#if $session.user}
	<LiveTopic/>
{:else}
	<section class="actions">
		<a href="/register">Register</a>
		<a href="/login">Login</a>
	</section>
{/if}
