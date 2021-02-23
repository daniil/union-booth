<script>
  import { stores } from '@sapper/app';
  import { mutation } from 'svelte-apollo';
  
  export let topicId;

  let textareaEl;

  const handleSubmit = async e => {
    console.log({
      question: e.target.question.value,
      isAnonymous: e.target['is-anonymous'].checked
    });

    if (!res.error) {
      textareaEl.value = '';
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
  .form-controls {
    display: flex;
    justify-content: space-between;
  }
</style>

<form action="/topics/ask" method="post" on:submit|preventDefault={handleSubmit}>
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
  <div class="form-controls">
    <div class="form-element">
      <input type="checkbox" name="is-anonymous" id="is-anonymous">
      <label for="is-anonymous">Ask anonymously</label>
    </div>
    <div class="form-element">
      <input type="submit" value="Post Question">
    </div>
  </div>
</form>