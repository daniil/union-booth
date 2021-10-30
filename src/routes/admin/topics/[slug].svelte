<svelte:head>
	<title>Union Booth :: Topic: {topic ? topic.title : 'Loading'}</title>
</svelte:head>

<script context="module">
  import { ADMIN_TOPIC } from 'graphql/queries/admin/topics';

  export async function preload(page, session) {
    await session.apolloClient.query({
      query: ADMIN_TOPIC,
      variables: { slug: page.params.slug }
    });

    return {
      slug: page.params.slug
    };
  }
</script>

<script>
  import { stores } from '@sapper/app';
  import { mutation } from 'svelte-apollo';
  import { ADD_TOPIC_CHEATSHEET } from 'graphql/queries/admin/topics';
  import MDEditor from 'components/shared/MDEditor.svelte';
  import Button from 'components/forms/Button.svelte';

  export let slug;
  
  const { session } = stores();

  let topic = $session.apolloClient.readQuery({
    query: ADMIN_TOPIC,
    variables: { slug }
  }).adminTopic;

  let formDisabled = false;
  let editorValue = topic?.cheatsheet || '';

  $: buttonVariant = formDisabled ? 'loading' : 'success';

  const addTopicCheatsheet = mutation(ADD_TOPIC_CHEATSHEET);

  const handleEditorChange = e => {
    editorValue = e.detail.value;
  }

  const saveCheatsheet = async () => {
    formDisabled = true;

    try {
      const updatedTopic = await addTopicCheatsheet({
        variables: {
          topicId: topic.id,
          details: editorValue
        }
      });

      $session.apolloClient.writeQuery({
        query: ADMIN_TOPIC,
        variables: { slug },
        data: {
          adminTopic: {
            ...updatedTopic.data.addTopicCheatsheet
          }
        }
      })

      formDisabled = false;
    } catch(err) {
      formDisabled = false;
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
  <h2 class="title">{topic?.title}</h2>
  <MDEditor
    id="cheatsheet"
    label="Topic Cheatsheet"
    placeholder="Topic Cheatsheet"
    value={editorValue}
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
