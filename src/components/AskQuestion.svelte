<script>
  import { onMount } from 'svelte';
  import { mutation } from 'svelte-apollo';
  import { ADD_COHORT_QUESTION } from 'graphql/queries/cohort-question';
  import Button from 'components/Button.svelte';

  export let liveTopic;

  const addCohortQuestion = mutation(ADD_COHORT_QUESTION);

  let textareaEl;
  let SimpleMDE;

  onMount(async () => {
    const SimpleMDEImport = await import('simplemde');
    SimpleMDE = new SimpleMDEImport.default({
      element: textareaEl,
      placeholder: 'Ask your question'
    });
  });

  const handleSubmit = async e => {
    try {
      await addCohortQuestion({
        variables: {
          topicId: liveTopic.topic.id,
          question: SimpleMDE.value(),
          isAnonymous: e.target['is-anonymous'].checked
        }
      });
      SimpleMDE.value('');
    } catch(err) {
      console.log('ERROR: ', err);
    }
  }
</script>

<style>
  .label {
    display: inline-block;
    margin-bottom: 0.25rem;
    color: #3E6990;
    font-size: 1rem;
  }
  .question-input {
    width: 100%;
    height: 5rem;
    padding: 1rem;
    margin-bottom: 0.25rem;
    font-size: 1rem;
  }
  .form-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>

<form action="/topics/ask" method="post" on:submit|preventDefault={handleSubmit}>
  <div class="form-element">
    <label class="label" for="question">Question</label>
    <br />
    <textarea
      bind:this={textareaEl}
      class="question-input"
      name="question"
      id="question"></textarea>
  </div>
  <div class="form-controls">
    <Button type="submit" icon="🖐🏽" label="Post Question"/>
    <div class="form-element">
      <input type="checkbox" name="is-anonymous" id="is-anonymous">
      <label for="is-anonymous">Ask anonymously</label>
    </div>
  </div>
</form>