<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'components/Button.svelte';
  import ConfirmationButton from 'components/ConfirmationButton.svelte';

  export let resourceId;

  const dispatch = createEventDispatcher();
  
  const handleAction = actionType => () => {
    dispatch(actionType, {
      resourceId
    });
  }
</script>

<style>
  .actions-container:not(:empty) {
    margin-left: -1.2rem;
  }
</style>

<div class="actions-container">
  <Button style="link" label="Edit" action={handleAction('edit')}/>
  <ConfirmationButton style="link" variant="danger" label="Deactivate" action={handleAction('deactivate')}/>
</div>