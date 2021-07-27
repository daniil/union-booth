<script>
  import { createEventDispatcher } from 'svelte';
  import Button from 'components/forms/Button.svelte';

  const dispatch = createEventDispatcher();

  const handleDeactivate = async () => {
    console.log('Deactivate User');
    dispatch('action-complete');
  }
</script>

<style lang="scss">
  .user-actions-nav {
    display: flex;
    padding: 0.75rem;
    background-color: #fff;
    box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
    border-radius: 4px;
  }
</style>

<nav class="user-actions-nav">
  <Button style="link" variant="danger" label="Deactivate" action={handleDeactivate}/>
</nav>