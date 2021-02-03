<script>
  export let cohortTopics;
</script>

{#if cohortTopics.length}
  {#each cohortTopics as cohortTopic (cohortTopic.topic.id)}
    <h4>{cohortTopic.topic.title}</h4>
  {/each}
{:else}
  <p>No topics currently 🤷🏽‍♂️</p>
{/if}