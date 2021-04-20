<script>
  import { parseMD } from 'utils/markdown';
  import CohortAnswers from 'components/admin/faqs/CohortAnswers.svelte';
  import Question from 'components/admin/faqs/Question.svelte';
  import QuestionMeta from 'components/admin/faqs/QuestionMeta.svelte';
  import QuestionActions from 'components/admin/faqs/QuestionActions.svelte';

  export let questions;
  export let filter;
  export let variant;

  $: filteredQuestions = questions.filter(question => {
    return question.convertedToFAQ === (filter === 'published');
  });

  $: actionsVariant = filter === 'nonPublished' ? 'nonPublished' : 'publishedCohort';
</script>

<style>
  h4 {
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }
  .question-actions {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 25%);
  }
</style>

{#if filteredQuestions.length}
  {#each filteredQuestions as question (question.id)}
    <Question {variant}>
      <h4>{@html parseMD(question.question)}</h4>
      {#if question.cohortAnswers.length}
        <CohortAnswers answers={question.cohortAnswers}/>
      {/if}
      <QuestionMeta
        cohort={question.cohort.title}
        timestamp={question.createdAt}
      />
      {#if actionsVariant !== 'publishedCohort'}
        <div class="question-actions">
          <QuestionActions variant={actionsVariant}/>
        </div>
      {/if}
    </Question>
  {/each}
{:else}
  <p>No cohort questions for this topic and filter yet. 🙅🏼</p>
{/if}