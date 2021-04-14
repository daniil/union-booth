<script>
  import { parseMD } from 'utils/markdown';
  import { formatDate, formatTime } from 'utils/time';
  import CohortAnswers from 'components/admin/faqs/CohortAnswers.svelte';

  export let questions;
</script>

<style>
  .question {
    padding: 1rem;
    margin-bottom: 2rem;
    background-color: #FFFDF7;
    border: 1px solid #E3DDE0;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
  }
  h4 {
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }
  .meta {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    color: rgba(1, 22, 56, 0.5);
    font-size: 0.8rem;
  }
</style>

{#if questions.length}
  {#each questions as question (question.id)}
    <div class="question">
      <h4>{@html parseMD(question.question)}</h4>
      {#if question.cohortAnswers.length}
        <CohortAnswers answers={question.cohortAnswers}/>
      {/if}
      <div class="meta">
        <span class="time">{formatDate(question.createdAt)}</span>
        <span class="cohort">{question.cohort.title}</span>
      </div>
    </div>
  {/each}
{:else}
  <p>No cohort questions for this topic yet. 🙅🏼</p>
{/if}