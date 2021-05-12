<script>
  import { createEventDispatcher } from 'svelte';
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
  .resource-editor {
    position: fixed;
    display: flex;
    justify-content: center;
    padding: 2rem;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    box-shadow: rgb(0 0 0 / 15%) 0px 10px 60px;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    transform: translateY(100%);
    transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1);
  }
  .editor-container {
    width: 100%;
    max-width: 52em;
  }
  h2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .close {
    padding: 0.5rem 0.75rem;
    border: 1px solid #D4C4C7;
    border-radius: 50%;
    background: none;
    font-size: 1rem;
    color: #9B6A6C;
    cursor: pointer;
  }
  .close:hover {
    background-color: #F6F3F4;
    border-color: #B09398;
    color: #B09398;
  }
  .visible {
    transform: translateY(0%);
  }
  .form-element {
    margin-bottom: 1.5rem;
  }
</style>

<section class="resource-editor" class:visible>
  <div class="editor-container">
    <h2>
      Resource Editor
      <button class="close" on:click={triggerClose}>X</button>
    </h2>
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
  </div>
</section>
