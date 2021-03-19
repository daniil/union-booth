<script>
  import { mutation } from 'svelte-apollo';
  import { ADD_COHORT_ANSWER } from 'graphql/queries/cohort-answer';
  import Button from 'components/Button.svelte';
  import AnswerAdminActions from 'components/AnswerAdminActions.svelte'

  export let questionId;
  export let beingAnsweredBy;
  export let answeredBy;

  const addCohortAnswer = mutation(ADD_COHORT_ANSWER);

  let formVisible = false;
  let textareaEl;

  const handleSubmit = async e => {
    try {
      await addCohortAnswer({
        variables: {
          cohortQuestionId: questionId,
          answer: e.target.answer.value
        }
      });
      textareaEl.value = '';
      toggleFormVisible();
    } catch(err) {
      console.log('ERROR: ', err);
    }
  }

  const toggleFormVisible = () => formVisible = !formVisible;
</script>

<style>
  form {
    margin-top: 2rem;
  }
  .label {
    display: inline-block;
    margin-bottom: 0.25rem;
    color: #3E6990;
    font-size: 1rem;
  }
  .answer-input {
    width: 100%;
    height: 5rem;
    padding: 1rem;
    margin-bottom: 0.25rem;
    font-size: 1rem;
  }
  .action-bar {
    display: flex;
    justify-content: space-between;
  }
  .post-answer {
    margin-top: 2rem;
  }
</style>

{#if formVisible}
  <form action="/topics/answers" method="post" on:submit|preventDefault={handleSubmit}>
    <div class="form-element">
      <label class="label" for="answer">Answer</label>
      <br />
      <textarea
        bind:this={textareaEl}
        class="answer-input"
        name="answer"
        id="answer"
        placeholder="Add your answer"
        required></textarea>
    </div>
    <div class="action-bar">
      <div class="form-element">
        <Button type="submit" icon="📮" label="Post Answer"/>
        <Button icon="💨" label="Cancel" action={toggleFormVisible} preventDefault/>
      </div>
      <AnswerAdminActions
        {questionId}
        {beingAnsweredBy}
        {answeredBy}
      />
    </div>
  </form>
{:else}
  <div class="post-answer">
    <Button icon="🧠" label="Answer" action={toggleFormVisible}/>
  </div>
{/if}