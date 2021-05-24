<script>
  import { parseMD } from 'utils/markdown';
  import ResourceActions from 'components/admin/resources/ResourceActions.svelte';

  export let resource;
  export let displayType;
</script>

<style>
  a {
    display: block;
    text-decoration: none;
    color: #05668F;
  }
  a:hover {
    filter: brightness(1.25);
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
  h3 {
    font-weight: 500;
  }
  li.linksOnly h3 {
    margin-bottom: 0.5rem;
  }
  li.expanded h3 {
    margin-bottom: 0.3rem;
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

<li class={displayType}>
  <a href={resource.url} target="_blank">
    <h3>{resource.title}</h3>
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
</li>
