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

<style lang="scss">
  @use '../../../styles/partials/admin';
  h4 {
    margin-bottom: 2rem;
    font-size: 0.95rem;
    line-height: 1.5;
    @media (min-width: 48rem) {
      font-size: 1.1rem;
    }
  }
  .question-actions {
    @extend %question-actions;
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
          <QuestionActions
            questionId={question.id}
            variant={actionsVariant}
            on:publish
          />
        </div>
      {/if}
    </Question>
  {/each}
{:else}
  <p>No cohort questions for this topic and filter yet. 🙅🏼</p>
{/if}