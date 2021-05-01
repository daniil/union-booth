<script>
  import TopicFAQQuestion from 'components/TopicFAQQuestion.svelte';

  export let topic;
</script>

{#each topic.topicFAQQuestions as question (question.id)}
  <TopicFAQQuestion {question}/>
{/each}