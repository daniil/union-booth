<script>
  import { mutation } from 'svelte-apollo';
  import { stores } from '@sapper/app';
  import { UPDATE_COHORT_ANSWER_PROGRESS } from 'graphql/queries/cohort-answer-in-progress';
  import AuthContent from 'components/auth/AuthContent.svelte';
  import Button from 'components/forms/Button.svelte';

  export let questionId;
  export let beingAnsweredBy;
  export let answeredBy;
  export let disabled;
  export let isLoading;

  const { session } = stores();

  $: isAnswering = !!beingAnsweredBy.find(answer => {
    return answer.isActive && answer.user.id === $session.user.id;
  });

  $: isAnswered = !!answeredBy.find(answer => {
    return !answer.isActive && answer.user.id === $session.user.id;
  });

  $: buttonVariant = isLoading ? 'loading' : '';

  const updateCohortAnswerProgress = mutation(UPDATE_COHORT_ANSWER_PROGRESS);

  const handleAnswerProgress = async () => {
    try {
      isLoading = true;

      await updateCohortAnswerProgress({
        variables: {
          cohortQuestionId: questionId,
          status: true
        }
      });

      isLoading = false;
    } catch(err) {
      console.log('ERROR: ', err);
    }
  }
</script>

<style lang="scss">
  .admin-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 0.9rem;
    margin-top: 1rem;
    @media (min-width: 48rem) {
      margin-top: 0;
    }
    :global(.button) {
      margin-right: 0;
      flex-grow: 1;
      justify-content: center;
    }
  }
  .answering {
    color: #B7990D;
  }
  .answered {
    color: #395647;
  }
</style>

<AuthContent role="moderator">
  <div class="admin-actions">
    {#if isAnswering}
      <span class="answering">🤔 Already Answering</span>
    {:else if isAnswered}
      <span class="answered">✅ Answered</span>
    {:else}
      <Button variant={buttonVariant} icon="💬" label="Answering" action={handleAnswerProgress} preventDefault {disabled}/>
    {/if}
  </div>
</AuthContent>
