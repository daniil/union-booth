<script>
  import { goto, stores } from '@sapper/app';
	import { mutation } from 'svelte-apollo';
  import { LOGOUT } from 'graphql/queries/login';
  import Avatar from 'components/Avatar.svelte';

  const { session } = stores();
	const logoutUser = mutation(LOGOUT);

	const handleLogout = async () => {
		await logoutUser();

		$session.user = null;
		goto('/');
	}
</script>

<style lang="scss">
  .avatar-container {
    display: flex;
    align-items: center;
    position: relative;
    top: 28px;
    transform: translateY(-50%);
    cursor: pointer;
    transition: filter 0.25s;
    &:hover {
      filter: drop-shadow(0px 4px 12px rgb(0 0 0 / 10%));
      .triangle-down {
        filter: brightness(1.25);
      }
      :global(.avatar) {
        transform: scale(1.05);
      }
    }
    :global(.avatar) {
      display: block;
      margin-right: 0.5rem;
      transition: transform 0.25s;
    }
  }
  a {
		text-decoration: none;
		padding: 1em 0.5em;
		display: block;
	}
  .triangle-down {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #7D6D61;
  }
</style>

<div class="avatar-container">
  <Avatar user={$session.user}/>
  <div class="triangle-down"></div>
</div>

<!-- <a href="/logout" on:click|preventDefault={handleLogout}>Logout</a> -->