<script>
  import AuthContent from '../components/AuthContent.svelte';
  import Button from '../components/Button.svelte';

  export let questionId;

  let formVisible = false;
  let textareaEl;

  const handleSubmit = async e => {
    console.log('Value: ', e.target.answer.value);
    textareaEl.value = '';
    toggleFormVisible();
  }

  const toggleFormVisible = () => formVisible = !formVisible;
</script>

<style>
  form {
    margin-top: 2rem;
  }
  .answer-input {
    width: 100%;
    height: 5rem;
  }
  .action-bar {
    display: flex;
    justify-content: space-between;
  }
</style>

{#if formVisible}
  <form action="/topics/answers" method="post" on:submit|preventDefault={handleSubmit}>
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
    <div class="action-bar">
      <div class="form-element">
        <input type="submit" value="Post Answer">
        <input type="button" value="Cancel" on:click={toggleFormVisible}>
      </div>
      <AuthContent role="moderator">
        <div class="admin-actions">
          <span>Moderator Actions</span>
        </div>
      </AuthContent>
    </div>
  </form>
{:else}
  <Button
    icon="💬"
    label="Answer"
    action={toggleFormVisible}
  />
{/if}