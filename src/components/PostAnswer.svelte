<script>
  import { createEventDispatcher } from 'svelte';
  import { post } from '../utils/request';

  export let questionId = $$props['question-id'];

  const dispatch = createEventDispatcher();

  let textareaEl;

  const handleSubmit = async e => {
    const res = await post(`/discourse/answers/${questionId}.json`, {
      answer: e.target.answer.value
    });

    if (!res.error) {
      textareaEl.value = '';
      dispatch('answer-added');
    } else {
      console.log('ERROR: ', res.error);
    }
  }
</script>

<style>
  form {
    margin-top: 2rem;
  }
  .answer-input {
    width: 100%;
    height: 5rem;
  }
</style>

<form action="/discourse/answers" method="post" on:submit|preventDefault={handleSubmit}>
  <div class="form-element">
    <label for="answer">Answer: </label>
    <br />
    <textarea
      bind:this={textareaEl}
      class="answer-input"
      name="answer"
      id="answer"
      placeholder="Add your answer"
      required></textarea>
  </div>
  <div class="form-element">
    <input type="submit" value="Post Answer">
  </div>
</form>