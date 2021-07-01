<script>
  import TopicResource from 'components/topics/TopicResource.svelte';

  export let topic;
</script>

{#if topic.resources.length}
  {#each topic.resources as resource (resource.id)}
    <TopicResource {resource}/>
  {/each}
{:else}
  <p>No Resources currently 📂</p>
{/if}
