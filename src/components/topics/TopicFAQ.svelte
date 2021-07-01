<script>
  import TopicFAQQuestion from 'components/topics/TopicFAQQuestion.svelte';

  export let topic;
</script>

{#if topic.topicFAQQuestions.length}
  {#each topic.topicFAQQuestions as question (question.id)}
    <TopicFAQQuestion {question}/>
  {/each}
{:else}
  <p>No FAQs currently 🔮</p>
{/if}