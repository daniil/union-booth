<script>
  import Cohort from './_Cohort.svelte';

  export let cohorts;
</script>

{#if cohorts.length}
  {#each cohorts as cohort (cohort.id)}
    <Cohort details={cohort}/>
  {/each}
{:else}
  <p>No cohorts currently 🙍🏼‍♂️</p>
{/if}