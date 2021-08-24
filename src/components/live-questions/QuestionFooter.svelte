<script>
  import Avatar from 'components/shared/Avatar.svelte';
  import PostTimestamp from 'components/shared/PostTimestamp.svelte';

  export let details;
</script>

<style lang="scss">
  .meta {
    display: flex;
    align-items: center;
  }
</style>

<footer class="meta">
  {#if details.isAnonymous}
    <Avatar/>
  {:else}
    <Avatar
      user={details.user}
      alt={`Posted by: ${details.user.firstName} ${details.user.lastName}`}
    />
  {/if}
  <PostTimestamp {details}/>
</footer>