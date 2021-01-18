<script>
  export let programs;
</script>

{#if programs.length > 0}
  {#each programs as program (program.id)}
    <p>{program.title}</p>
  {/each}
{:else}
  <p>No programs currently 🙍🏼‍♂️</p>
{/if}