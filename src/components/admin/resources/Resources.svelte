<script>
  import Resource from 'components/admin/resources/Resource.svelte';

  export let resources;
</script>

<style>
  ul {
    padding: 0 1.2rem;
  }
</style>

<ul>
  {#each resources as resource (resource.id)}
    <Resource {resource}/>
  {/each}
</ul>
