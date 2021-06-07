<script>
  import { goto, stores } from '@sapper/app';
	import { mutation } from 'svelte-apollo';
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import { LOGOUT } from 'graphql/queries/login';
  import Avatar from 'components/Avatar.svelte';

  const { session } = stores();
	const logoutUser = mutation(LOGOUT);

  let navVisible = false;

	const handleLogout = async () => {
		await logoutUser();

		$session.user = null;
		goto('/');
	}

  const toggleNav = () => {
    navVisible = !navVisible;
  }

  const handleClickOff = e => {
    if (navVisible) {
      let parent = e.target;
      while (parent.parentNode) {
        if (parent.classList.contains('profile-nav')) {
          return;
        }
        parent = parent.parentNode;
      }
      navVisible = false;
    }
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
    position: relative;
		text-decoration: none;
		padding: 0.75rem 1.5rem;
		display: block;
    &:hover {
			background-color: #F6F4F5;
		}
    &:not(:last-child) {
      &::after {
        position: absolute;
        content: '';
        width: 75%;
        height: 1px;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        background-color: #EDE9EB;
      }
    }
	}
  .triangle-down {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #7D6D61;
  }
  .profile-nav {
    position: absolute;
    top: 165%;
    padding: 0.25rem 0;
    background-color: #fff;
    right: 0;
    box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
    border-radius: 4px;
  }
</style>

<svelte:window
  on:click={handleClickOff}
/>

<div class="avatar-container" on:click|stopPropagation={toggleNav}>
  <Avatar
    user={$session.user}
    alt={`${$session.user.firstName} ${$session.user.lastName} Profile`}
  />
  <div class="triangle-down"></div>
</div>
{#if navVisible}
  <nav class="profile-nav" transition:fly="{{ duration: 300, y: 5, opacity: 0, easing: quintOut }}">
    <a href="/profile">Profile</a>
    <a href="/logout" on:click|preventDefault={handleLogout}>Logout</a>
  </nav>
{/if}