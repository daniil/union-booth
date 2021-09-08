<script>
  import { parseMD } from 'utils/markdown';
  import ResourceActions from 'components/admin/resources/ResourceActions.svelte';

  export let resource;
  export let displayType;
</script>

<style lang="scss">
  a {
    display: block;
    text-decoration: none;
    color: #05668F;
    &:hover {
      filter: brightness(1.25);
    }
  }
  h3 {
    font-size: 1rem;
    font-weight: 500;
    @media (min-width: 48rem) {
      font-size: 1.17rem;
    }
    &.linksOnly {
      margin-bottom: 0.5rem;
    }
    &.expanded {
      margin-bottom: 0.3rem;
    }
  }
  .url {
    font-size: 0.9rem;
    margin: 0 0 0.75rem;
  }
  .description {
    margin: 0;
    color: rgba(85, 67, 72, 0.9);
  }
</style>

<a href={resource.url} target="_blank">
  <h3 class={displayType}>{resource.title}</h3>
  {#if displayType === 'expanded'}
    <p class="url">{resource.url}</p>
  {/if}
</a>
{#if displayType === 'expanded'}
  <p class="description">{@html parseMD(resource.description)}</p>
{/if}
<ResourceActions
  resourceId={resource.id}
  on:edit
  on:deactivate
/>
