<script>
  import Resource from 'components/admin/resources/Resource.svelte';

  export let resources;
</script>

<style>
  ul {
    padding: 0 1.2rem;
  }
</style>

{#if resources.length}
  <ul>
    {#each resources as resource (resource.id)}
      <Resource
        {resource}
        on:edit
        on:deactivate
      />
    {/each}
  </ul>
{:else}
  <p>No resources for this topic yet. 🙅🏽‍♂️</p>
{/if}