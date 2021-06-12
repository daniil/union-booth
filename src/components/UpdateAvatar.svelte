<script>
  import { stores } from '@sapper/app';
  import { mutation } from 'svelte-apollo';
  import { UPDATE_USER_AVATAR } from 'graphql/queries/user';
  import Button from 'components/Button.svelte';

  export let user;

  const { session } = stores();
  const updateUserAvatar = mutation(UPDATE_USER_AVATAR);

  let isChanging = false;

  const handleGenerateAvatar = () => {
    try {
      isChanging = true;

      setTimeout(async () => {
        const updateResult = await updateUserAvatar({
          variables: {
            userId: user.id
          }
        });
        if (updateResult.data.updateUserAvatar) {
          $session.userAvatarRefreshToken = Date.now();
          isChanging = false;
        } else {
          console.log('ERROR');
        }
      }, 250);
    } catch(err) {
      console.log('ERROR: ', err);
    }
  }
</script>

<style lang="scss">
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20%;
    :global(.button) {
      margin: 1rem 0 0 0;
    }
  }
  .avatar {
    width: 150px;
    transition: filter 0.25s, opacity 0.25s, transform 0.25s;
    &.is-changing {
      filter: blur(10px) grayscale(1);
      opacity: 0.25;
      transform: scale(0.9);
    }
  }
</style>

{#if user}
  <div class="wrapper">
    <img
      class="avatar"
      class:is-changing={isChanging}
      src={`avatars/${user.id}.svg?refresh=${$session.userAvatarRefreshToken}`}
      alt={`${user.username} avatar`}
      title={`${user.username} avatar`}
    />
    <Button icon="🌀" label="Generate New" action={handleGenerateAvatar}/>
  </div>
{/if}