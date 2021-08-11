<script>
  import { createEventDispatcher } from 'svelte';
  import { mutation } from 'svelte-apollo';
  import { ADD_COHORT_QUESTION } from 'graphql/queries/cohort-question';
  import Button from 'components/forms/Button.svelte';
  import MDEditor from 'components/shared/MDEditor.svelte';
  import Checkbox from 'components/forms/Checkbox.svelte';

  export let liveTopic;
  export let selectedQuestion;

  const dispatch = createEventDispatcher();
  const addCohortQuestion = mutation(ADD_COHORT_QUESTION);

  let editorContainer;
  let questionText;
  let formDisabled = false;

  $: if (selectedQuestion) setEditorValue();
  $: postBtnDisabled = questionText === undefined || questionText === '';
  $: buttonVariant = formDisabled ? 'loading' : '';

  const setEditorValue = () => {
    questionText = selectedQuestion.question;
    editorContainer.scrollIntoView({ behavior: 'smooth' });
  }

  const handleSubmit = async e => {
    try {
      formDisabled = true;

      await addCohortQuestion({
        variables: {
          questionId: selectedQuestion?.id,
          topicId: liveTopic.topic.id,
          question: questionText,
          isAnonymous: e.target.isAnonymous?.checked ?? selectedQuestion.isAnonymous
        }
      });

      formDisabled = false;
      questionText = '';

      if (selectedQuestion) {
        dispatch('scroll-to-question', {
          questionId: selectedQuestion.id
        });
      }

      dispatch('cancel-question');
    } catch(err) {
      formDisabled = false;
      console.log('ERROR: ', err);
    }
  }

  const handleEditorChange = event => {
    questionText = event.detail.value;
  }

  const handleQuestionCancel = () => {
    questionText = '';
    dispatch('cancel-question');
  }
</script>

<style>
  .form-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>

<form action="/topics/ask" method="post" on:submit|preventDefault={handleSubmit}>
  <div class="form-element" bind:this={editorContainer}>
    <MDEditor
      id="question"
      label="Question"
      placeholder="Ask your question"
      value={questionText}
      on:change={handleEditorChange}
      disabled={formDisabled}
    />
  </div>
  <div class="form-controls">
    <div>
      {#if selectedQuestion}
        <Button type="submit" variant={buttonVariant} icon="✏️" label="Update Question" disabled={postBtnDisabled}/>
      {:else}
        <Button type="submit" variant={buttonVariant} icon="🖐🏽" label="Post Question" disabled={postBtnDisabled}/>
      {/if}
      {#if !postBtnDisabled}
        <Button icon="💨" label="Cancel" action={handleQuestionCancel} disabled={formDisabled} preventDefault/>
      {/if}
    </div>
    {#if !selectedQuestion}
      <Checkbox id="isAnonymous" label="Ask anonymously" disabled={formDisabled}/>
    {/if}
  </div>
</form>