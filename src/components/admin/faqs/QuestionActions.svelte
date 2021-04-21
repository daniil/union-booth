<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'components/Button.svelte';

  export let questionId;
  export let variant;

  const dispatch = createEventDispatcher();

  const handlePublish = () => {
    dispatch('publish', {
      questionId
    });
  }

  const handleEdit = () => {
    dispatch('edit', {
      questionId
    });
  }

  const handleDelete = () => {
    dispatch('delete', {
      questionId
    });
  }
</script>

<style>
  .actions-container:not(:empty) {
    background-color: white;
    padding: 0.75rem 1rem;
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
  }
</style>

<div class="actions-container">
  {#if variant === 'nonPublished'}
    <Button style="link" label="Publish" action={handlePublish}/>
  {:else if variant === 'published'}
    <Button style="link" label="Edit" action={handleEdit}/>
    <Button style="link" variant="danger" label="Delete" action={handleDelete}/>
  {/if}
</div>