<script>
  import { stores } from '@sapper/app';
  import { flip } from "svelte/animate";
  import { dndzone } from "svelte-dnd-action";
  import { mutation } from 'svelte-apollo';
  import Resource from 'components/admin/resources/Resource.svelte';
  import DragIcon from 'components/DragIcon.svelte';
  import { TOPIC_RESOURCES, UPDATE_RESOURCES_ORDER } from 'graphql/queries/topic-resources';

  export let topicSlug;
  export let resources;
  export let displayType;

  const { session } = stores();

  const updateResourcesOrder = mutation(UPDATE_RESOURCES_ORDER);

  const flipDurationMs = 300;
  let isHovered = null;
  
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
        topicSlug,
        orderList
      },
      update: (_, mutationResult) => {
        const updatedResources = mutationResult.data.updateResourcesOrder.resources;

        let topicResources = $session.apolloClient.readQuery({
          query: TOPIC_RESOURCES,
          variables: { slug: topicSlug }
        }).topicResources;

        $session.apolloClient.writeQuery({
          query: TOPIC_RESOURCES,
          variables: { slug: topicSlug },
          data: {
            topicResources: {
              ...topicResources,
              resources: updatedResources
            }
          }
        })
      }
    });
  }
</script>

<style lang="scss">
  ul {
    padding: 0 1.2rem;
    list-style-type: none;
  }
  li {
    position: relative;
    transition: opacity 0.15s, transform 0.15s;
    &:hover {
      transform: scale(1.01);
    }
    &.is-muted {
      opacity: 0.7;
    }
    &.linksOnly {
      margin-bottom: 1.25rem;
    }
    &.expanded {
      margin-bottom: 2rem;
    }
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