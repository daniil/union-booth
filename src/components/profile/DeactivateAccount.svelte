<script>
  import ConfirmationButton from 'components/forms/ConfirmationButton.svelte';

  const handleDeactivate = () => {
    console.log('Deactivate');
  }
</script>

<style>
  .deactivate-container {
    display: flex;
    justify-content: center;
  }
</style>

<div class="deactivate-container">
  <ConfirmationButton style="link" variant="danger" label="Deactivate Account" action={handleDeactivate}/>
</div>