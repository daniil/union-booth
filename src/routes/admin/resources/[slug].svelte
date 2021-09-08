<svelte:head>
	<title>Union Booth :: FAQs: {topicResources.topic ? topicResources.topic.title : 'Loading'}</title>
</svelte:head>

<script context="module">
  import { TOPIC_RESOURCES, DEACTIVATE_RESOURCE } from 'graphql/queries/topic-resources';

  export async function preload(page, session) {
    await session.apolloClient.query({
      query: TOPIC_RESOURCES,
      variables: { slug: page.params.slug }
    });

    return {
      slug: page.params.slug
    }
  }
</script>

<script>
  import { stores } from '@sapper/app';
  import { mutation } from 'svelte-apollo';
  import { onDestroy } from 'svelte';
  import Resources from 'components/admin/resources/Resources.svelte';
  import ResourceEditor from 'components/admin/resources/ResourceEditor.svelte';
  import Button from 'components/forms/Button.svelte';
  import ResourcesDisplayTypeSwitch from 'components/admin/resources/ResourcesDisplayTypeSwitch.svelte';

  export let slug;

  const { session } = stores();

  const deactivateResource = mutation(DEACTIVATE_RESOURCE);

  let editorIsVisible = false;
  let displayType;
  let selectedResource;
  let editorMode;

  let topicResources = $session.apolloClient.readQuery({
    query: TOPIC_RESOURCES,
    variables: { slug }
  }).topicResources;

  const topicResourcesSub = $session.apolloClient
    .watchQuery({
      query: TOPIC_RESOURCES,
      variables: { slug },
      fetchPolicy: 'cache-and-network'
    })
    .subscribe(({ data }) => {
      topicResources = data.topicResources;
    });
  
  onDestroy(() => topicResourcesSub.unsubscribe());

  const handleAddNew = () => {
    editorMode = 'add';
    editorIsVisible = true;
  }

  const handleClose = () => {
    editorMode = null;
    selectedResource = null;
    editorIsVisible = false;
  }

  const handleEdit = e => {
    editorMode = 'edit';
    selectedResource = topicResources.resources.find(resource => resource.id === e.detail.resourceId);
    if (selectedResource) editorIsVisible = true;
  }

  const handleDeactivate = async e => {
    try {
      await deactivateResource({
        variables: {
          id: e.detail.resourceId
        },
        update: (_, mutationResult) => {
          $session.apolloClient.writeQuery({
            query: TOPIC_RESOURCES,
            variables: { slug },
            data: {
              topicResources: {
                ...topicResources,
                resources: topicResources.resources.filter(resource => resource.id !== mutationResult.data.deactivateResource.id)
              }
            }
          })
        }
      });
    } catch(err) {
      console.log('ERROR: ', err);
    }
  }
</script>

<style lang="scss">
  @use '../../../styles/partials/buttons';
  @use '../../../styles/partials/admin';
  section {
    position: relative;
    margin-bottom: 2rem;
  }
  .back {
    @extend %back-btn;
    @media (min-width: 48rem) {
      position: absolute;
      display: block;
      top: -45px;
      text-decoration: none;
    }
  }
  .title {
    @extend %section-title;
  }
</style>

<section>
  <a class="back" href="/admin/resources">&#10092; back</a>
  <h2 class="title">
    {topicResources.topic.title} Resources
    <Button
      variant="success"
      icon="➕"
      label="Add New Resource"
      action={handleAddNew}
      disabled={editorIsVisible}
    />
  </h2>
  {#if topicResources.resources.length}
    <ResourcesDisplayTypeSwitch
      bind:value={displayType}
    />
  {/if}
  <Resources
    topicSlug={topicResources.topic.slug}
    resources={topicResources.resources}
    {displayType}
    on:edit={handleEdit}
    on:deactivate={handleDeactivate}
  />
</section>
<ResourceEditor
  topic={topicResources.topic}
  mode={editorMode}
  resource={selectedResource}
  visible={editorIsVisible}
  on:close={handleClose}
/>