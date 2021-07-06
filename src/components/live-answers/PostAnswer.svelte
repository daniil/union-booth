<script>
  import { createEventDispatcher, tick } from 'svelte';
  import { stores } from '@sapper/app';
  import { mutation } from 'svelte-apollo';
  import { ADD_COHORT_ANSWER } from 'graphql/queries/cohort-answer';
  import { UPDATE_COHORT_ANSWER_PROGRESS } from 'graphql/queries/cohort-answer-in-progress';
  import MDEditor from 'components/shared/MDEditor.svelte';
  import Button from 'components/forms/Button.svelte';
  import AnswerAdminActions from 'components/live-answers/AnswerAdminActions.svelte'
  import roleMap from 'utils/role-map';

  export let questionId;
  export let beingAnsweredBy;
  export let answeredBy;
  export let selectedAnswer;

  const { session } = stores();
  const dispatch = createEventDispatcher();

  const addCohortAnswer = mutation(ADD_COHORT_ANSWER);
  const updateCohortAnswerProgress = mutation(UPDATE_COHORT_ANSWER_PROGRESS);

  let editorContainer;
  let formVisible = false;
  let answerText;
  let formDisabled = false;

  $: if (selectedAnswer) setEditorValue();
  $: buttonVariant = formDisabled ? 'loading' : '';
  $: postBtnDisabled = answerText === undefined || answerText === '';

  const setEditorValue = async () => {
    answerText = selectedAnswer.answer;
    formVisible = true;
    await tick();
    editorContainer.scrollIntoView({ behavior: 'smooth' });
  }

  const handleSubmit = async e => {
    try {
      formDisabled = true;

      await addCohortAnswer({
        variables: {
          answerId: selectedAnswer?.id,
          cohortQuestionId: questionId,
          answer: answerText
        }
      });

      if (roleMap[$session.user.role].includes('moderator')) {
        await updateCohortAnswerProgress({
          variables: {
            cohortQuestionId: questionId,
            status: false
          }
        });
      }

      formDisabled = false;
      answerText = '';
      toggleFormVisible();
      dispatch('answer-published');
      dispatch('cancel-answer');
    } catch(err) {
      formDisabled = false;
      console.log('ERROR: ', err);
    }
  }

  const toggleFormVisible = () => {
    answerText = '';
    formVisible = !formVisible;
    dispatch('cancel-answer');
  }

  const handleEditorChange = event => {
    answerText = event.detail.value;
  }
</script>

<style>
  form {
    margin-top: 2rem;
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
    <div class="form-element" bind:this={editorContainer}>
      <MDEditor
        id="answer"
        label="Answer"
        placeholder="Add your answer"
        value={answerText}
        on:change={handleEditorChange}
        disabled={formDisabled}
      />
    </div>
    <div class="action-bar">
      <div class="form-element">
        {#if selectedAnswer}
          <Button type="submit" variant={buttonVariant} icon="✏️" label="Update Answer" disabled={postBtnDisabled}/>
        {:else}
          <Button type="submit" variant={buttonVariant} icon="📮" label="Post Answer" disabled={postBtnDisabled}/>
        {/if}
        <Button icon="💨" label="Cancel" action={toggleFormVisible} preventDefault disabled={formDisabled}/>
      </div>
      <AnswerAdminActions
        {questionId}
        {beingAnsweredBy}
        {answeredBy}
        disabled={formDisabled}
      />
    </div>
  </form>
{:else}
  <div class="post-answer">
    <Button icon="🧠" label="Answer" action={toggleFormVisible}/>
  </div>
{/if}