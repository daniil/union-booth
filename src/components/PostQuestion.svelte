<script>
  import { mutation } from 'svelte-apollo';
  import { ADD_COHORT_QUESTION } from 'graphql/queries/cohort-question';
  import Button from 'components/Button.svelte';
  import MDEditor from 'components/MDEditor.svelte';
  import Checkbox from 'components/Checkbox.svelte';

  export let liveTopic;
  export let selectedQuestion;

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
          topicId: liveTopic.topic.id,
          question: questionText,
          isAnonymous: e.target.isAnonymous.checked
        }
      });

      formDisabled = false;
      questionText = '';
    } catch(err) {
      formDisabled = false;
      console.log('ERROR: ', err);
    }
  }

  const handleEditorChange = event => {
    questionText = event.detail.value;
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
    <Button type="submit" variant={buttonVariant} icon="🖐🏽" label="Post Question" disabled={postBtnDisabled}/>
    <Checkbox id="isAnonymous" label="Ask anonymously" disabled={formDisabled}/>
  </div>
</form>