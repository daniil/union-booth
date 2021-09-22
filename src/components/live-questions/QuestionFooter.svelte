<script>
  import Avatar from 'components/shared/Avatar.svelte';
  import PostTimestamp from 'components/shared/PostTimestamp.svelte';
  import Upvote from 'components/shared/Upvote.svelte';

  export let details;

  const handleUpvote = () => {
    console.log('Handle question upvote');
  }
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
  <Upvote on:click={handleUpvote}/>
</footer>