<script>
  import { createEventDispatcher } from 'svelte';
  import SlideOutPanel from 'components/SlideOutPanel.svelte';
  import TextInput from 'components/TextInput.svelte';
  import MDEditor from 'components/MDEditor.svelte';
  import Button from 'components/Button.svelte';

  export let visible;

  const dispatch = createEventDispatcher();

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
    console.log(editorValues);
    triggerClose();
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
