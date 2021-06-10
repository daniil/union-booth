<script>
  import Button from 'components/Button.svelte';

  export let user;

  const handleGenerateAvatar = () => {
    console.log('Generate new avatar');
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
  }
</style>

<div class="wrapper">
  <img
    class="avatar"
    src={`avatars/${user.id}.svg`}
    alt={`${user.username} avatar`}
    title={`${user.username} avatar`}
  />
  <Button icon="🌀" label="Generate New" action={handleGenerateAvatar}/>
</div>
