<script>
  import TopicResource from 'components/topics/TopicResource.svelte';

  export let topic;
</script>

<style>
  p {
    padding: 1rem 0 2rem;
    text-align: center;
    color: #7D6D61;
  }
</style>

{#if topic.resources.length}
  {#each topic.resources as resource (resource.id)}
    <TopicResource {resource}/>
  {/each}
{:else}
  <p>No Resources currently 📂</p>
{/if}
