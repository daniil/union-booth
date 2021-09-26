<script>
  import { stores } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import { mutation } from 'svelte-apollo';
  import { COHORT_QUESTION_UPVOTES, TOGGLE_COHORT_QUESTION_UPVOTE } from 'graphql/queries/cohort-question-upvote';
  import Avatar from 'components/shared/Avatar.svelte';
  import PostTimestamp from 'components/shared/PostTimestamp.svelte';
  import Upvote from 'components/shared/Upvote.svelte';

  export let details;

  const { session } = stores();

  let upvotes = [];
  let fetchingUpvotes = true;
  let isUpvoting = false;
  let isFlipped = false;

  const toggleCohortQuestionUpvote = mutation(TOGGLE_COHORT_QUESTION_UPVOTE);

  $: upvoteCount = fetchingUpvotes ? null : upvotes.length;
  $: cohortQuestionUpvotesSub = watchCohortQuestionUpvotesQuery(details);

  const watchCohortQuestionUpvotesQuery = details => {
    return $session.apolloClient
      .watchQuery({
        query: COHORT_QUESTION_UPVOTES,
        variables: {
          cohortQuestionId: details.id
        }
      })
      .subscribe(({ data }) => {
        if (!data) return;
        upvotes = data.cohortQuestionUpvotes;
        fetchingUpvotes = false;
      })
  }

  onDestroy(() => cohortQuestionUpvotesSub.unsubscribe());

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
    count={upvoteCount}
    on:click={handleUpvote}
    {isUpvoting}
    flipped={isFlipped}
  />
</footer>