<script>
  import AuthContent from 'components/AuthContent.svelte';
  import Button from 'components/Button.svelte';

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
  .label {
    display: inline-block;
    margin-bottom: 0.25rem;
    color: #3E6990;
    font-size: 1rem;
  }
  .answer-input {
    width: 100%;
    height: 5rem;
    padding: 1rem;
    margin-bottom: 0.25rem;
    font-size: 1rem;
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
    <div class="form-element">
      <label class="label" for="answer">Answer</label>
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
        <Button type="submit" icon="📮" label="Post Answer"/>
        <Button icon="💨" label="Cancel" action={toggleFormVisible}/>
      </div>
      <AuthContent role="moderator">
        <div class="admin-actions">
          <span>Moderator Actions</span>
        </div>
      </AuthContent>
    </div>
  </form>
{:else}
  <div class="post-answer">
    <Button icon="💬" label="Answer" action={toggleFormVisible}/>
  </div>
{/if}