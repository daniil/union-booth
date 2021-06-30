<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'components/Button.svelte';

  export let answerId;
  export let isOwner;

  const dispatch = createEventDispatcher();
  
  const handleEdit = () => {
    dispatch('action-complete');
  }

  const handleDeactivate = () => {
    dispatch('action-complete');
  }
</script>

<style lang="scss">
  .question-actions-nav {
    display: flex;
    padding: 0.75rem;
    background-color: #fff;
    box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
    border-radius: 4px;
  }
</style>

<nav class="question-actions-nav">
  {#if isOwner}
    <Button style="link" label="Edit" action={handleEdit}/>
  {/if}
  <Button style="link" variant="danger" label="Delete" action={handleDeactivate}/>
</nav>