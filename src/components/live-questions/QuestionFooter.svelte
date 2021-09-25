<script>
  import { mutation } from 'svelte-apollo';
  import { TOGGLE_COHORT_QUESTION_UPVOTE } from 'graphql/queries/cohort-question';
  import Avatar from 'components/shared/Avatar.svelte';
  import PostTimestamp from 'components/shared/PostTimestamp.svelte';
  import Upvote from 'components/shared/Upvote.svelte';

  export let details;

  let isUpvoting = false;
  let isFlipped = false;

  const toggleCohortQuestionUpvote = mutation(TOGGLE_COHORT_QUESTION_UPVOTE);

  const handleUpvote = async () => {
    isUpvoting = true;

    await toggleCohortQuestionUpvote({
      variables: {
        cohortQuestionId: details.id,
        isAdd: true
      }
    });

    isFlipped = !isFlipped;
    isUpvoting = false;
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
  <Upvote
    on:click={handleUpvote}
    {isUpvoting}
    flipped={isFlipped}
  />
</footer>