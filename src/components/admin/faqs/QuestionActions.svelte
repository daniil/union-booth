<script>
  import Button from 'components/Button.svelte';

  const handlePublish = () => {
    console.log('Publish.');
  }
</script>

<style>
  .actions-container {
    background-color: white;
    padding: 0.75rem 1rem;
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
  }
</style>

<div class="actions-container">
  <Button variant="link" label="Edit and Publish" action={handlePublish}/>
</div>