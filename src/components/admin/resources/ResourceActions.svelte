<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'components/forms/Button.svelte';
  import ConfirmationButton from 'components/forms/ConfirmationButton.svelte';

  export let resourceId;

  const dispatch = createEventDispatcher();
  
  const handleAction = actionType => () => {
    dispatch(actionType, {
      resourceId
    });
  }
</script>

<style lang="scss">
  .actions-container:not(:empty) {
    margin-left: -1.2rem;
    :global(.button-text) {
      font-size: 0.8rem;
      @media (min-width: 48rem) {
        font-size: 0.9rem;
      }
    }
  }
</style>

<div class="actions-container">
  <Button style="link" label="Edit" action={handleAction('edit')}/>
  <ConfirmationButton style="link" variant="danger" label="Deactivate" action={handleAction('deactivate')}/>
</div>