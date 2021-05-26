<script>
  import { flip } from "svelte/animate";
  import { dndzone } from "svelte-dnd-action";
  import { mutation } from 'svelte-apollo';
  import Resource from 'components/admin/resources/Resource.svelte';
  import DragIcon from 'components/DragIcon.svelte';
  import { UPDATE_RESOURCES_ORDER } from 'graphql/queries/topic-resources';

  export let topicId;
  export let resources;
  export let displayType;

  const flipDurationMs = 300;
  let isHovered = null;

  const updateResourcesOrder = mutation(UPDATE_RESOURCES_ORDER);

  const handleDndConsider = e => {
    resources = e.detail.items;
  }

  const handleDndFinalize = e => {
    resources = e.detail.items;
    saveOrder();
  }

  const saveOrder = async () => {
    const orderList = resources.map((resource, i) => {
      return {
        id: resource.id,
        order: i
      }
    });

    await updateResourcesOrder({
      variables: {
        topicId,
        orderList
      },
      update: (_, mutationResult) => {
        console.log('UPDATED RESOURCES ORDER: ', mutationResult.data.updateResourcesOrder);
      }
    });
  }
</script>

<style>
  ul {
    padding: 0 1.2rem;
    list-style-type: none;
  }
  li {
    position: relative;
    transition: opacity 0.15s, transform 0.15s;
  }
  li:hover {
    transform: scale(1.01);
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
  <ul
    use:dndzone={{
      items: resources,
      flipDurationMs,
      dropTargetStyle: { backgroundColor: 'rgba(85, 67, 72, 0.025)', outline: 'rgba(85, 67, 72, 0.25) solid 2px' }
    }}
    on:consider={handleDndConsider}
    on:finalize={handleDndFinalize}
  >
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