<script>
  import { stores } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import { mutation, subscribe } from 'svelte-apollo';
  import { COHORT_ANSWER_UPVOTES, TOGGLE_COHORT_ANSWER_UPVOTE, COHORT_ANSWER_UPVOTE_UPDATED } from 'graphql/queries/cohort-answer-upvote';
  import { parseMD } from 'utils/markdown';
  import roleMap from 'utils/role-map';
  import Avatar from 'components/shared/Avatar.svelte';
  import AnswerActions from 'components/live-answers/AnswerActions.svelte';
  import PostTimestamp from 'components/shared/PostTimestamp.svelte';
  import Upvote from 'components/shared/Upvote.svelte';

  export let details;

  const { session } = stores();

  let upvotes = [];
  let fetchingUpvotes = true;
  let isUpvoting = false;

  const toggleCohortAnswerUpvote = mutation(TOGGLE_COHORT_ANSWER_UPVOTE);

  $: content = parseMD(details.answer);
  $: isOwner = $session.user.id === details.user.id;
  $: questionActionsEnabled = roleMap[$session.user.role].includes('moderator') || isOwner;
  $: isFlipped = checkUserVote(upvotes);
  $: cohortAnswerUpvotesSub = watchCohortAnswerUpvotesQuery(details);

  const checkUserVote = upvotes => {
    return upvotes.some(vote => {
      return vote.user.id === $session.user.id;
    });
  }

  const watchCohortAnswerUpvotesQuery = details => {
    return $session.apolloClient
      .watchQuery({
        query: COHORT_ANSWER_UPVOTES,
        variables: {
          cohortAnswerId: details.id
        }
      })
      .subscribe(({ data }) => {
        if (!data) return;
        upvotes = data.cohortAnswerUpvotes;
        fetchingUpvotes = false;
      })
  }

  onDestroy(() => cohortAnswerUpvotesSub.unsubscribe());

  $: cohortAnswerUpvoteUpdated = subscribe(COHORT_ANSWER_UPVOTE_UPDATED, {
    variables: {
      cohortAnswerId: details.id
    }
  });

  $: cohortAnswerUpvoteUpdatedUnsub = subscribeToCohortAnswerUpvoteUpdated(details.id);

  const subscribeToCohortAnswerUpvoteUpdated = cohortAnswerId => {
    return cohortAnswerUpvoteUpdated.subscribe(value => {
      if (value.data) {
        const upvoteData = value.data.cohortAnswerUpvoteUpdated;
        const userVoted = upvotes.some(vote => {
          return vote.user.id === upvoteData.user.id;
        });
        let updatedData = upvotes.slice();

        if (upvoteData.isAdd) {
          if (!userVoted) {
            updatedData.push(upvoteData);
          }
        } else {
          updatedData = upvotes.filter(vote => {
            return vote.user.id !== upvoteData.user.id;
          });
        }

        $session.apolloClient.writeQuery({
          query: COHORT_ANSWER_UPVOTES,
          variables: {
            cohortAnswerId
          },
          data: {
            cohortAnswerUpvotes: updatedData
          }
        })
      }
    });
  }

  onDestroy(() => cohortAnswerUpvoteUpdatedUnsub);

  const handleUpvote = async () => {
    isUpvoting = true;

    await toggleCohortAnswerUpvote({
      variables: {
        cohortAnswerId: details.id,
        isAdd: !isFlipped
      }
    });

    isUpvoting = false;
  }
</script>

<style lang="scss">
  .answer {
    display: flex;
    align-items: flex-start;
    margin-bottom: 2.5rem;
  }
  .answer-wrapper {
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.75rem;
  }
  .answer-content {
    display: flex;
    flex-direction: column;
  }
  .answer-actions {
    display: flex;
    flex-direction: column;
    @media (min-width: 48rem) {
      flex-direction: row;
      gap: 0.75rem;
      align-items: center;
    }
    :global(.actions-container) {
      left: 0.3rem;
      margin-bottom: -0.35rem;
    }
    :global(.upvote) {
      top: 0;
    }
  }
  h4 {
    margin-bottom: 0;
    font-size: 0.9rem;
    line-height: 1.5;
    @media (min-width: 48rem) {
      font-size: 1rem;
    }
    > :global(p) {
      margin-top: 0;
    }
  }
</style>

<div class="answer">
  <Avatar
    user={details.user}
    alt={`Posted by: ${details.user.firstName} ${details.user.lastName}`}
  />
  <div class="answer-wrapper">
    <div class="answer-content">
      <h4>{@html content}</h4>
      <PostTimestamp {details} reduced/>
    </div>
    <div class="answer-actions">
      {#if questionActionsEnabled}
        <AnswerActions
          answerId={details.id}
          {isOwner}
          on:edit
        />
      {/if}
      {#if !fetchingUpvotes}
        <Upvote
          count={upvotes.length}
          on:click={handleUpvote}
          {isUpvoting}
          flipped={isFlipped}
        />
      {/if}
    </div>
  </div>
</div>
