<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'components/forms/Button.svelte';
  import ConfirmationButton from 'components/forms/ConfirmationButton.svelte';

  export let questionId;
  export let variant;

  const dispatch = createEventDispatcher();
  
  const handleAction = actionType => () => {
    dispatch(actionType, {
      questionId
    });
  }
</script>

<style lang="scss">
  .actions-container:not(:empty) {
    background-color: white;
    padding: 0.75rem 1rem;
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
    border-radius: 4px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    text-align: center;
    @media (min-width: 48rem) {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      text-align: left;
    }
  }
</style>

<div class="actions-container">
  {#if variant === 'nonPublished'}
    <Button style="link" label="Publish" action={handleAction('publish')}/>
  {:else if variant === 'published'}
    <Button style="link" label="Edit" action={handleAction('edit')}/>
    <ConfirmationButton style="link" variant="danger" label="Deactivate" action={handleAction('deactivate')}/>
  {/if}
</div>