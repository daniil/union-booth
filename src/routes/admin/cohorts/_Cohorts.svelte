<script>
  export let cohorts;
</script>

{#if cohorts.length}
  {#each cohorts as cohort (cohort.id)}
    <p>{cohort.title}</p>
  {/each}
{:else}
  <p>No cohorts currently 🙍🏼‍♂️</p>
{/if}