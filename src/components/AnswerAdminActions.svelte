<script>
  import { mutation } from 'svelte-apollo';
  import { UPDATE_COHORT_ANSWER_PROGRESS } from 'graphql/queries/cohort-answer-in-progress';
  import AuthContent from 'components/AuthContent.svelte';
  import Button from 'components/Button.svelte';

  export let questionId;
  export let beingAnsweredBy;
  export let answeredBy;

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

<AuthContent role="moderator">
  <div class="admin-actions">
    <Button icon="💬" label="Answering" action={handleAnswerProgress} preventDefault/>
  </div>
</AuthContent>
