<script>
  import { mutation } from 'svelte-apollo';
  import { stores } from '@sapper/app';
  import { UPDATE_COHORT_ANSWER_PROGRESS } from 'graphql/queries/cohort-answer-in-progress';
  import AuthContent from 'components/AuthContent.svelte';
  import Button from 'components/Button.svelte';

  export let questionId;
  export let beingAnsweredBy;
  export let answeredBy;

  const { session } = stores();

  $: isAnswering = !!beingAnsweredBy.find(answer => {
    return answer.isActive && answer.user.id === $session.user.id;
  });

  $: isAnswered = !!answeredBy.find(answer => {
    return !answer.isActive && answer.user.id === $session.user.id;
  })

  const updateCohortAnswerProgress = mutation(UPDATE_COHORT_ANSWER_PROGRESS);

  const handleAnswerProgress = async () => {
    try {
      await updateCohortAnswerProgress({
        variables: {
          cohortQuestionId: questionId,
          status: true
        }
      });
    } catch(err) {
      console.log('ERROR: ', err);
    }
  }
</script>

<style>
  .admin-actions {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
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
      <Button icon="💬" label="Answering" action={handleAnswerProgress} preventDefault/>
    {/if}
  </div>
</AuthContent>
