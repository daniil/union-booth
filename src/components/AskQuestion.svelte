<script>
  import { createEventDispatcher } from 'svelte';
  import { post } from '../utils/request';

  export let discourseId = $$props['discourse-id'];

  const dispatch = createEventDispatcher();

  const handleSubmit = async e => {
    const postQuestion = await post('discourse/ask.json', {
      discourseId,
      question: e.target.question.value,
      isAnonymous: e.target['is-anonymous'].checked
    });

    if (!postQuestion.error) {
      dispatch('question-added');
    } else {
      console.log('ERROR', postQuestion.error);
    }
  }
</script>

<form action="/discourse/ask" method="post" on:submit|preventDefault={handleSubmit}>
  <div class="form-element">
    <label for="question">Question: </label>
    <br />
    <textarea name="question" id="question" placeholder="Ask your question" required></textarea>
  </div>
  <div class="form-element">
    <input type="checkbox" name="is-anonymous" id="is-anonymous">
    <label for="is-anonymous">Ask Anonymously</label>
  </div>
  <div class="form-element">
    <input type="submit" value="Ask">
  </div>
</form>