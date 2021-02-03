<script>
  import CohortTopic from 'components/admin/active-cohort/CohortTopic.svelte';

  export let cohortTopics;
</script>

{#if cohortTopics.length}
  {#each cohortTopics as cohortTopic (cohortTopic.topic.id)}
    <CohortTopic details={cohortTopic.topic}/>
  {/each}
{:else}
  <p>No topics currently 🤷🏽‍♂️</p>
{/if}