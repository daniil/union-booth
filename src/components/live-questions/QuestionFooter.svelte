<script>
  import { stores } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import { mutation, subscribe } from 'svelte-apollo';
  import { COHORT_QUESTION_UPVOTES, TOGGLE_COHORT_QUESTION_UPVOTE, COHORT_QUESTION_UPVOTE_UPDATED } from 'graphql/queries/cohort-question-upvote';
  import Avatar from 'components/shared/Avatar.svelte';
  import PostTimestamp from 'components/shared/PostTimestamp.svelte';
  import Upvote from 'components/shared/Upvote.svelte';

  export let details;

  const { session } = stores();

  let upvotes = [];
  let fetchingUpvotes = true;
  let isUpvoting = false;

  const toggleCohortQuestionUpvote = mutation(TOGGLE_COHORT_QUESTION_UPVOTE);

  $: isFlipped = checkUserVote(upvotes);
  $: cohortQuestionUpvotesSub = watchCohortQuestionUpvotesQuery(details);

  const checkUserVote = upvotes => {
    return upvotes.some(vote => {
      return vote.user.id === $session.user.id;
    });
  }

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

  $: cohortQuestionUpvoteUpdated = subscribe(COHORT_QUESTION_UPVOTE_UPDATED, {
    variables: {
      cohortQuestionId: details.id
    }
  });

  $: cohortQuestionUpvoteUpdatedUnsub = subscribeToCohortQuestionUpvoteUpdated(details.id);

  const subscribeToCohortQuestionUpvoteUpdated = cohortQuestionId => {
    return cohortQuestionUpvoteUpdated.subscribe(value => {
      if (value.data) {
        console.log('Update: ', value.data);
      }
    })
  }

  onDestroy(() => cohortQuestionUpvoteUpdatedUnsub)

  const handleUpvote = async () => {
    isUpvoting = true;

    await toggleCohortQuestionUpvote({
      variables: {
        cohortQuestionId: details.id,
        isAdd: true
      }
    });

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
  {#if !fetchingUpvotes}
    <Upvote
      count={upvotes.length}
      on:click={handleUpvote}
      {isUpvoting}
      flipped={isFlipped}
    />
  {/if}
</footer>