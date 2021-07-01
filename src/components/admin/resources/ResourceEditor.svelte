<script>
  import { stores } from '@sapper/app';
  import { createEventDispatcher } from 'svelte';
  import { mutation } from 'svelte-apollo';
  import SlideOutPanel from 'components/shared/SlideOutPanel.svelte';
  import TextInput from 'components/forms/TextInput.svelte';
  import MDEditor from 'components/shared/MDEditor.svelte';
  import Button from 'components/forms/Button.svelte';
  import { TOPIC_RESOURCES, ADD_RESOURCE } from 'graphql/queries/topic-resources';

  export let topic;
  export let mode;
  export let resource;
  export let visible;
  
  const { session } = stores();
  const dispatch = createEventDispatcher();

  const addResource = mutation(ADD_RESOURCE);

  let editorValues = {
    title: '',
    url: '',
    description: ''
  }
  let formDisabled = false;

  $: submitDisabled = editorValues.title === '' || editorValues.url === '';
  $: buttonVariant = formDisabled ? 'loading' : 'success';
  $: if (resource) setEditorValues();

  const setEditorValues = () => {
    editorValues = {
      title: resource.title,
      url: resource.url,
      description: resource.description
    }
  }

  const handleEditorChange = event => {
    editorValues[event.detail.id] = event.detail.value;
  }

  const saveResource = async () => {
    formDisabled = true;
    
    const mutationVariables = {
      topicId: topic.id,
      title: editorValues.title,
      url: editorValues.url,
      description: editorValues.description
    };

    if (mode === 'edit' && resource) {
      mutationVariables.id = resource.id;
    }

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

          let newTopicResourcesData = {
            ...topicResourcesData
          }

          if (mode === 'add') {
            newTopicResourcesData = {
              ...newTopicResourcesData,
              resources: [...topicResourcesData.resources, newResource]
            }
          }

          if (mode === 'edit' && resource) {
            newTopicResourcesData = {
              ...newTopicResourcesData,
              resources: topicResourcesData.resources.map(resource => {
                if (resource.id === newResource.id) {
                  return newResource;
                } else {
                  return resource;
                }
              })
            }
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

      formDisabled = false;
      triggerClose();
    } catch(err) {
      formDisabled = false;
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
  on:close={triggerClose}
  {visible}
>
  <div class="form-element">
    <TextInput
      id="title"
      type="text"
      label="Resource Title"
      labelStyle="admin"
      bind:value={editorValues.title}
      required
      disabled={formDisabled}
    />
  </div>
  <div class="form-element">
    <TextInput
      id="url"
      type="text"
      label="Resource URL"
      labelStyle="admin"
      bind:value={editorValues.url}
      required
      disabled={formDisabled}
    />
  </div>
  <MDEditor
    id="description"
    label="Resource Description"
    placeholder="Resource Description"
    value={editorValues.description}
    on:change={handleEditorChange}
    disabled={formDisabled}
  />
  <Button
    variant={buttonVariant}
    icon="👍"
    label="Save"
    action={saveResource}
    disabled={submitDisabled}
  />
</SlideOutPanel>
