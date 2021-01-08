<script>
  import { createEventDispatcher } from 'svelte';
  import { stores } from '@sapper/app';
  import { post } from '../utils/request';
  import AuthContent from '../components/AuthContent.svelte';

  export let topicId;
  export let questionId;
  export let questionDetails;

  const { session } = stores();
  const dispatch = createEventDispatcher();

  $: youAreAnswering = questionDetails.beingAnsweredBy.includes($session.user.id);
  $: youAnswered = questionDetails.answeredBy.includes($session.user.id);

  let formVisible = false;
  let textareaEl;

  const handleSubmit = async e => {
    const res = await post(`/topics/answers/${questionId}.json`, {
      answer: e.target.answer.value
    });

    if (!res.error) {
      textareaEl.value = '';
      toggleFormVisible();
      dispatch('answer-added');
    } else {
      console.log('ERROR: ', res.error);
    }
  }

  const toggleFormVisible = () => formVisible = !formVisible;

  const handleAnswerProgress = async () => {
    const res = await post(`topics/question/answering/${topicId}/${questionId}.json`);

    if (!res.error) {
      dispatch('answering');
    } else {
      console.log('ERROR: ', res.error);
    }
  }

  const handleAnswered = async () => {
    const res = await post(`topics/question/answered/${topicId}/${questionId}.json`);

    if (!res.error) {
      dispatch('answered');
    } else {
      console.log('ERROR: ', res.error);
    }
  }
</script>

<style>
  .toggle-form {
    margin-top: 1rem;
  }
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
          {#if !youAreAnswering}
            {#if youAnswered}
              ✅ You answered
            {:else}
              <button on:click|preventDefault={handleAnswerProgress}>
                💭 Answering
              </button>
            {/if}
          {/if}
        </div>
      </AuthContent>
    </div>
  </form>
{:else}
  <button class="toggle-form" on:click={toggleFormVisible}>
    💬 Answer
  </button>
  {#if youAreAnswering}
    <button class="toggle-answered" on:click={handleAnswered}>
      ✅ Mark Answered
    </button>
  {/if}
{/if}