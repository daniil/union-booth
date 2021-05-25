<script>
  import { flip } from "svelte/animate";
  import { dndzone } from "svelte-dnd-action";
  import Resource from 'components/admin/resources/Resource.svelte';
  import DragIcon from 'components/DragIcon.svelte';

  export let resources;
  export let displayType;

  const flipDurationMs = 300;
  let isHovered = null;

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
    list-style-type: none;
  }
  li {
    position: relative;
    transition: opacity 0.15s;
  }
  li.is-muted {
    opacity: 0.7;
  }
  li.linksOnly {
    margin-bottom: 1.25rem;
  }
  li.expanded {
    margin-bottom: 2rem;
  }
  .drag-icon-container {
    position: absolute;
    top: 0;
    left: -1.2rem;
  }
</style>

{#if resources.length}
  <ul use:dndzone={{ items: resources, flipDurationMs }} on:consider={handleDndConsider} on:finalize={handleDndFinalize}>
    {#each resources as resource (resource.id)}
      <li
        class={displayType}
        class:is-muted={isHovered && isHovered !== resource.id}
        animate:flip={{ duration: flipDurationMs }}
        on:mouseover={() => isHovered = resource.id}
        on:mouseout={() => isHovered = null}
      >
        <Resource
          {resource}
          {displayType}
          on:edit
          on:deactivate
        />
        <div class="drag-icon-container">
          <DragIcon isHovered={isHovered === resource.id}/>
        </div>
      </li>
    {/each}
  </ul>
{:else}
  <p>No resources for this topic yet. 🙅🏽‍♂️</p>
{/if}