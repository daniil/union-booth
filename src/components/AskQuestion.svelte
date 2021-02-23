<script>
  import { stores } from '@sapper/app';
  import { mutation } from 'svelte-apollo';
  import { ADD_COHORT_QUESTION } from 'graphql/queries/cohort-question';
  import { LIVE_QUESTIONS } from 'graphql/queries/cohort-question';

  export let liveTopic;

  const { session } = stores();

  const addCohortQuestion = mutation(ADD_COHORT_QUESTION);

  let textareaEl;

  const handleSubmit = async e => {
    try {
      await addCohortQuestion({
        variables: {
          topicId: liveTopic.topic.id,
          question: e.target.question.value,
          isAnonymous: e.target['is-anonymous'].checked
        },
        update: (_, mutationResult) => {
          const liveQuestions = $session.apolloClient.readQuery({
            query: LIVE_QUESTIONS,
            variables: {
              cohortId: liveTopic.cohortId,
              topicId: liveTopic.topic.id
            }
          }).liveQuestions;

          $session.apolloClient.writeQuery({
            query: LIVE_QUESTIONS,
            variables: {
              cohortId: liveTopic.cohortId,
              topicId: liveTopic.topic.id
            },
            data: {
              liveQuestions: [mutationResult.data.addCohortQuestion, ...liveQuestions]
            }
          });
        }
      })
      textareaEl.value = '';
    } catch(err) {
      console.log('ERROR: ', err);
    }
  }
</script>

<style>
  .question-input {
    width: 100%;
    height: 5rem;
    padding: 1rem;
    font-size: 1rem;
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