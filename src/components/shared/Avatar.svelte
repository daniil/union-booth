<script>
  import { stores } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import { subscribe } from 'svelte-apollo';
  import { USER_AVATAR_UPDATED } from 'graphql/queries/user';

  export let user;
  export let alt;

  const { session } = stores();
  
  $: avatarUpdated = user && subscribe(USER_AVATAR_UPDATED, {
    variables: {
      userId: user.id
    }
  });

  $: avatarUpdatedUnsub = user && subscribeToAvatarUpdated(user.id);

  const subscribeToAvatarUpdated = userId => {
    avatarUpdatedUnsub && avatarUpdatedUnsub();
    return avatarUpdated.subscribe(value => {
      if (value.data && value.data.userAvatarUpdated === userId) {
        $session.userAvatarRefreshToken = Date.now();
      }
    });
  }

  onDestroy(() => user && avatarUpdatedUnsub());
</script>

<style>
  .avatar {
    width: 30px;
    margin-right: 1rem;
  }
  .anon {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    border-radius: 50%;
    background-color: #D3D3D3;
    color: #fff;
  }
</style>

{#if !user}
  <div class="avatar anon">?</div>
{:else}
  <img
    class="avatar"
    src={`avatars/${user.id}.svg?refresh=${$session.userAvatarRefreshToken || Date.now()}`}
    alt={alt}
    title={alt}
  />
{/if}