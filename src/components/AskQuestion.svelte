<script>
  import { mutation } from 'svelte-apollo';
  import { ADD_COHORT_QUESTION } from 'graphql/queries/cohort-question';
  import Button from 'components/Button.svelte';
  import MDEditor from 'components/MDEditor.svelte';
  import Checkbox from 'components/Checkbox.svelte';

  export let liveTopic;

  const addCohortQuestion = mutation(ADD_COHORT_QUESTION);

  let questionText;

  const handleSubmit = async e => {
    try {
      await addCohortQuestion({
        variables: {
          topicId: liveTopic.topic.id,
          question: questionText,
          isAnonymous: e.target.isAnonymous.checked
        }
      });
      questionText = '';
    } catch(err) {
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
  <div class="form-element">
    <MDEditor
      id="question"
      label="Question"
      placeholder="Ask your question"
      value={questionText}
      on:change={handleEditorChange}
    />
  </div>
  <div class="form-controls">
    <Button type="submit" icon="🖐🏽" label="Post Question"/>
    <Checkbox id="isAnonymous" label="Ask anonymously"/>
  </div>
</form>