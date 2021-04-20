<script>
  import Button from 'components/Button.svelte';

  export let variant;

  const handlePublish = () => {
    console.log('Publish.');
  }

  const handleEdit = () => {
    console.log('Edit');
  }

  const handleDelete = () => {
    console.log('Delete');
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
    <Button variant="link" label="Publish" action={handlePublish}/>
  {:else if variant === 'published'}
    <Button variant="link" label="Edit" action={handleEdit}/>
    <Button variant="link" label="Delete" action={handleDelete}/>
  {/if}
</div>