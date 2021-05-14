<script>
  import Resource from 'components/admin/resources/Resource.svelte';

  export let resources;
</script>

<ul>
  {#each resources as resource (resource.id)}
    <Resource {resource}/>
  {/each}
</ul>
