<svelte:head>
	<title>Union Booth :: Home</title>
</svelte:head>

<script>
	import { stores } from '@sapper/app';
	import LiveTopic from 'components/LiveTopic.svelte';

	const { session } = stores();
</script>

<style>
	.banner {
		display: flex;
		position: relative;
		justify-content: center;
		overflow: hidden;
	}
	.banner h1 {
		position: absolute;
    top: 32%;
	}
	.banner h2 {
		position: absolute;
		top: 40%;
	}
	.banner img {
		width: 145%;
	}
	.actions {
		display: flex;
		justify-content: center;
		position: absolute;
    top: 50%;
	}
	a {
		margin: 0 1rem;
    font-size: 1.5rem;
    color: #9D695B;
    text-decoration: none;
    border-bottom: 3px solid #D496A7;
    padding-bottom: 0.25rem;
	}
	a:hover {
		border-bottom-color: #9D695B;
		opacity: 0.8;
	}
</style>

{#if $session.user}
	<LiveTopic/>
{:else}
	<section class="banner">
		<h1>Union Booth</h1>
		<h2>Q/A Platform for the now</h2>
		<img src="home-banner.svg" alt="Union Booth banner"/>
		<section class="actions">
			<a href="/register">Register</a>
			<a href="/login">Login</a>
		</section>
	</section>
{/if}
