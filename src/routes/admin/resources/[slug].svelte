<svelte:head>
	<title>Union Booth :: FAQs: {resources.topic ? resources.topic.title : 'Loading'}</title>
</svelte:head>

<script context="module">
  import { RESOURCES } from 'graphql/queries/admin/resources';

  export async function preload(page, session) {
    await session.apolloClient.query({
      query: RESOURCES,
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
  import Button from 'components/Button.svelte';

  export let slug;

  const { session } = stores();

  let resources = $session.apolloClient.readQuery({
    query: RESOURCES,
    variables: { slug }
  }).resources;

  const resourcesSub = $session.apolloClient
    .watchQuery({
      query: RESOURCES,
      variables: { slug },
      fetchPolicy: 'cache-and-network'
    })
    .subscribe(({ data }) => {
      resources = data.resources;
    });
  
  onDestroy(() => resourcesSub.unsubscribe());
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
    Resources
    <Button variant="success" icon="➕" label="Add New Resource"/>
  </h2>
</section>
