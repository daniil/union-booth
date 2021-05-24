<script>
  import { flip } from "svelte/animate";
  import { dndzone } from "svelte-dnd-action";
  import Resource from 'components/admin/resources/Resource.svelte';

  export let resources;
  export let displayType;

  const flipDurationMs = 300;

  const handleDndConsider = e => {
    resources = e.detail.items;
  }

  const handleDndFinalize = e => {
    resources = e.detail.items;
  }
</script>

<style>
  ul {
    padding: 0 1.2rem;
  }
  li.linksOnly {
    margin-bottom: 1.25rem;
  }
  li.expanded {
    margin-bottom: 2rem;
  }
  li::marker {
    color: rgba(85, 67, 72, 0.75);
  }
</style>

{#if resources.length}
  <ul use:dndzone={{ items: resources, flipDurationMs }} on:consider={handleDndConsider} on:finalize={handleDndFinalize}>
    {#each resources as resource (resource.id)}
      <li class={displayType} animate:flip={{ duration: flipDurationMs }}>
        <Resource
          {resource}
          {displayType}
          on:edit
          on:deactivate
        />
      </li>
      
    {/each}
  </ul>
{:else}
  <p>No resources for this topic yet. 🙅🏽‍♂️</p>
{/if}