<script>
  import { stores } from '@sapper/app';
  import { createEventDispatcher } from 'svelte';
  import { mutation } from 'svelte-apollo';
  import SlideOutPanel from 'components/SlideOutPanel.svelte';
  import TextInput from 'components/TextInput.svelte';
  import MDEditor from 'components/MDEditor.svelte';
  import Button from 'components/Button.svelte';
  import { TOPIC_RESOURCES, ADD_RESOURCE } from 'graphql/queries/topic-resources';

  export let topic;
  export let visible;
  
  const { session } = stores();
  const dispatch = createEventDispatcher();

  const addResource = mutation(ADD_RESOURCE);

  let editorValues = {
    title: '',
    url: '',
    description: ''
  }

  $: submitDisabled = editorValues.title === '' || editorValues.url === '';

  const handleEditorChange = event => {
    editorValues[event.detail.id] = event.detail.value;
  }

  const saveResource = async () => {
    const mutationVariables = {
      topicId: topic.id,
      title: editorValues.title,
      url: editorValues.url,
      description: editorValues.description
    };

    try {
      await addResource({
        variables: mutationVariables,
        update: (_, mutationResult) => {
          const newResource = mutationResult.data.addResource;
          const topicResourcesData = $session.apolloClient.readQuery({
            query: TOPIC_RESOURCES,
            variables: {
              slug: topic.slug
            }
          }).topicResources;

          const newTopicResourcesData = {
            ...topicResourcesData,
            resources: [...topicResourcesData.resources, newResource]
          }

          $session.apolloClient.writeQuery({
            query: TOPIC_RESOURCES,
            variables: {
              slug: topic.slug
            },
            data: {
              topicResources: newTopicResourcesData
            }
          })
        }
      });

      triggerClose();
    } catch(err) {
      console.log('ERROR: ', err);
    }
    
  }

  const triggerClose = () => {
    editorValues = {
      title: '',
      url: '',
      description: ''
    };
    dispatch('close');
  }
</script>

<style>
  .form-element {
    margin-bottom: 1.5rem;
  }
</style>

<SlideOutPanel
  title="Resource Editor"
  on:close
  {visible}
>
  <div class="form-element">
    <TextInput id="title" type="text" label="Resource Title" labelStyle="admin" bind:value={editorValues.title} required/>
  </div>
  <div class="form-element">
    <TextInput id="url" type="text" label="Resource URL" labelStyle="admin" bind:value={editorValues.url} required/>
  </div>
  <MDEditor
    id="description"
    label="Description"
    placeholder="Resource Description"
    value={editorValues.description}
    on:change={handleEditorChange}
  />
  <Button variant="success" icon="👍" label="Save" action={saveResource} disabled={submitDisabled}/>
</SlideOutPanel>
