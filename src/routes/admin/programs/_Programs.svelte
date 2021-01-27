<script>
  import Program from './_Program.svelte';

  export let selectedProgram;
  export let programs;
</script>

{#if programs.length}
  {#each programs as program (program.id)}
    <Program
      {selectedProgram}
      details={program}
    />
  {/each}
{:else}
  <p>No programs currently 🙍🏼‍♂️</p>
{/if}