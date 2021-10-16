<svelte:head>
	<title>Union Booth :: Topic: {topic ? topic.topic.title : 'Loading'}</title>
</svelte:head>

<script context="module">
  import { TOPIC } from 'graphql/queries/cohort-topic';

  export async function preload(page, session) {
    await session.apolloClient.query({
      query: TOPIC,
      variables: { slug: page.params.slug }
    });

    return {
      slug: page.params.slug
    };
  }
</script>

<script>
  import { stores } from '@sapper/app';
  import MDEditor from 'components/shared/MDEditor.svelte';
  import Button from 'components/forms/Button.svelte';

  export let slug;

  let formDisabled = false;

  $: buttonVariant = formDisabled ? 'loading' : 'success';

  const { session } = stores();

  let topic = $session.apolloClient.readQuery({
    query: TOPIC,
    variables: { slug }
  }).topic;

  const handleEditorChange = e => {
    console.log(e.detail.value);
  }

  const saveCheatsheet = () => {
    console.log('Save cheatsheet');
    formDisabled = true;
  }
</script>

<style lang="scss">
  @use '../../../styles/partials/buttons';
  @use '../../../styles/partials/admin';
  section {
    position: relative;
    margin-bottom: 2rem;
    :global(.md-editor) {
      :global(.CodeMirror),
      :global(.CodeMirror-scroll) {
        min-height: 350px;
        max-height: 450px;
      }
    }
  }
  .back {
    @extend %back-btn;
    @media (min-width: 48rem) {
      position: absolute;
      display: block;
      margin-top: -2rem;
      top: -45px;
      text-decoration: none;
      line-height: initial;
      font-size: 1rem;
    }
  }
  .title {
    @extend %section-title;
  }
</style>

<section>
  <a class="back" href="/admin/topics">&#10092; back</a>
  <h2 class="title">{topic?.topic.title}</h2>
  <MDEditor
    id="cheatsheet"
    label="Topic Cheatsheet"
    placeholder="Topic Cheatsheet"
    value={topic?.topic.cheatsheet || ''}
    on:change={handleEditorChange}
    disabled={formDisabled}
  />
  <Button
    variant={buttonVariant}
    icon="👍"
    label="Save"
    action={saveCheatsheet}
  />
</section>