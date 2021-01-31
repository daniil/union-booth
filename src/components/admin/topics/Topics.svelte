<script>
  import Topic from 'components/admin/topics/Topic.svelte';

  export let topics;
</script>

{#if topics.length}
  {#each topics as topic (topic.id)}
    <Topic details={topic}/>
  {/each}
{:else}
  <p>No topics currently 🙍🏼‍♂️</p>
{/if}