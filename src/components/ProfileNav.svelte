<script>
  import { goto, stores } from '@sapper/app';
	import { mutation } from 'svelte-apollo';
  import { LOGOUT } from 'graphql/queries/login';

  const { session } = stores();
	const logoutUser = mutation(LOGOUT);

	const handleLogout = async () => {
		await logoutUser();

		$session.user = null;
		goto('/');
	}
</script>

<style>
  a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
</style>

<a href="/logout" on:click|preventDefault={handleLogout}>Logout</a>