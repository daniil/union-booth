<script>
  import Cohort from 'components/admin/cohorts/Cohort.svelte';

  export let selectedCohort;
  export let cohorts;
</script>

{#if cohorts.length}
  {#each cohorts as cohort (cohort.id)}
    <Cohort
      {selectedCohort}
      details={cohort}/>
  {/each}
{:else}
  <p>No cohorts currently 🙍🏼‍♂️</p>
{/if}