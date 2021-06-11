<script>
  import { mutation } from 'svelte-apollo';
  import { UPDATE_USER_AVATAR } from 'graphql/queries/user';
  import Button from 'components/Button.svelte';

  export let user;

  const updateUserAvatar = mutation(UPDATE_USER_AVATAR);

  let isChanging = false;
  let refreshToken;

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
          refreshToken = Date.now();
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
    :global(.button) {
      margin: 1rem 0 0 0;
    }
  }
  .avatar {
    width: 125px;
    transition: filter 0.25s, opacity 0.25s;
    &.is-changing {
      filter: blur(10px) grayscale(1);
      opacity: 0.25;
    }
  }
</style>

<div class="wrapper">
  <img
    class="avatar"
    class:is-changing={isChanging}
    src={`avatars/${user.id}.svg?refresh=${refreshToken}`}
    alt={`${user.username} avatar`}
    title={`${user.username} avatar`}
  />
  <Button icon="🌀" label="Generate New" action={handleGenerateAvatar}/>
</div>
