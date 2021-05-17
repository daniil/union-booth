<svelte:head>
	<title>Union Booth :: FAQs: {topicResources.topic ? topicResources.topic.title : 'Loading'}</title>
</svelte:head>

<script context="module">
  import { TOPIC_RESOURCES } from 'graphql/queries/topic-resources';

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
  import { onDestroy } from 'svelte';
  import Resources from 'components/admin/resources/Resources.svelte';
  import ResourceEditor from 'components/admin/resources/ResourceEditor.svelte';
  import Button from 'components/Button.svelte';

  export let slug;

  const { session } = stores();

  let editorIsVisible = false;

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
    editorIsVisible = true;
  }

  const handleClose = () => {
    editorIsVisible = false;
  }
</script>

<style>
  section {
    position: relative;
    margin-bottom: 2rem;
  }
  .back {
    position: absolute;
    display: block;
    top: -45px;
    text-decoration: none;
  }
  .title {
    display: flex;
    justify-content: space-between;
    align-content: center;
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
  <Resources resources={topicResources.resources}/>
</section>
<ResourceEditor
  topic={topicResources.topic}
  visible={editorIsVisible}
  on:close={handleClose}
/>