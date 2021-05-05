<script>
  import Topic from 'components/admin/resources/Topic.svelte';

  export let topics;
</script>

{#if topics.length}
  {#each topics as topic (topic.id)}
    <Topic {topic}/>
  {/each}
{:else}
  <p>No topics currently 🙍🏼‍♂️</p>
{/if}