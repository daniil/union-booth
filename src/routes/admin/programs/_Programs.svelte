<script>
  import Program from './_Program.svelte';

  export let programs;
</script>

{#if programs.length}
  {#each programs as program (program.id)}
    <Program
      details={program}
      on:program-selected
    />
  {/each}
{:else}
  <p>No programs currently 🙍🏼‍♂️</p>
{/if}