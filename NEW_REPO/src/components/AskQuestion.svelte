<script>
  import { createEventDispatcher } from 'svelte';
  import { post } from '../utils/request';

  export let discourseId = $$props['discourse-id'];

  const dispatch = createEventDispatcher();

  let textareaEl;

  const handleSubmit = async e => {
    const res = await post(`discourse/questions/${discourseId}.json`, {
      question: e.target.question.value,
      isAnonymous: e.target['is-anonymous'].checked
    });

    if (!res.error) {
      textareaEl.value = '';
      dispatch('question-added');
    } else {
      console.log('ERROR: ', res.error);
    }
  }
</script>

<style>
  .question-input {
    width: 100%;
    height: 5rem;
  }
</style>

<form action="/discourse/ask" method="post" on:submit|preventDefault={handleSubmit}>
  <div class="form-element">
    <label for="question">Question: </label>
    <br />
    <textarea
      bind:this={textareaEl}
      class="question-input"
      name="question"
      id="question"
      placeholder="Ask your question"
      required></textarea>
  </div>
  <div class="form-element">
    <input type="checkbox" name="is-anonymous" id="is-anonymous">
    <label for="is-anonymous">Ask anonymously</label>
  </div>
  <div class="form-element">
    <input type="submit" value="Post Question">
  </div>
</form>