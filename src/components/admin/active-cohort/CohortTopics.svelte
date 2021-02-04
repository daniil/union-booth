<script>
  import CohortTopic from 'components/admin/active-cohort/CohortTopic.svelte';

  export let selectedCohort;
  export let cohortTopics;
</script>

{#if cohortTopics.length}
  {#each cohortTopics as cohortTopic (cohortTopic.topic.id)}
    <CohortTopic
      {selectedCohort}
      details={cohortTopic}
    />
  {/each}
{:else}
  <p>No topics currently 🤷🏽‍♂️</p>
{/if}