<script>
  import TopicFAQQuestion from 'components/topics/TopicFAQQuestion.svelte';

  export let topic;
</script>

<style>
  p {
    padding: 1rem 0 2rem;
    text-align: center;
    color: #7D6D61;
  }
</style>

{#if topic.topicFAQQuestions.length}
  {#each topic.topicFAQQuestions as question (question.id)}
    <TopicFAQQuestion {question}/>
  {/each}
{:else}
  <p>No FAQs currently 🔮</p>
{/if}