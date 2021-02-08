<script>
	import { goto, stores } from '@sapper/app';
	import { mutation } from 'svelte-apollo';
  import { LOGOUT } from 'graphql/queries/login';

	export let segment;

	const { session } = stores();
	const logoutUser = mutation(LOGOUT);

	const handleLogout = async () => {
		await logoutUser();

		$session.user = null;
		goto('/');
	}
</script>

<style>
	nav {
		border-bottom: 1px solid rgba(255, 62, 0, 0.1);
		font-weight: 300;
		padding: 0 1em;
	}

	ul {
		margin: 0;
		padding: 0;
	}

	/* clearfix */
	ul::after {
		content: '';
		display: block;
		clear: both;
	}

	li {
		display: block;
		float: left;
	}

	.right-aligned {
		float: right;
	}

	[aria-current] {
		position: relative;
		display: inline-block;
	}

	[aria-current]::after {
		position: absolute;
		content: '';
		width: calc(100% - 1em);
		height: 2px;
		background-color: #E8B4BC;
		display: block;
		bottom: -1px;
	}

	a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
</style>

<nav>
	<ul>
		<li>
			<a aria-current="{segment === undefined ? 'page' : undefined}" href=".">
				🙋🏻‍♀️ Union Booth
			</a>
		</li>
		{#if $session.user}
			<li>
				<a rel="prefetch" aria-current="{segment === 'topics' ? 'page' : undefined}" href="/topics">
					All Topics
				</a>
			</li>
			<li class="right-aligned">
				<a href="/logout" on:click|preventDefault={handleLogout}>Logout</a>
			</li>
			{#if $session.user.role === 'admin'}
				<li class="right-aligned">
					<a rel="prefetch" aria-current="{segment === 'admin' ? 'page' : undefined}" href="/admin">Admin</a>
				</li>
			{/if}
		{/if}
	</ul>
</nav>
