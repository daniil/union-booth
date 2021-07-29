<script>
  import { createEventDispatcher } from 'svelte';
  import { mutation } from 'svelte-apollo';
  import { DEACTIVATE_USER } from 'graphql/queries/admin/users';
  import Button from 'components/forms/Button.svelte';

  export let userId;

  const dispatch = createEventDispatcher();

  const deactivateUser = mutation(DEACTIVATE_USER);

  let actionsDisabled = false;

  $: buttonVariant = actionsDisabled ? 'loading' : 'danger';

  const handleDeactivate = async () => {
    try {
      actionsDisabled = true;

      await deactivateUser({
        variables: {
          id: userId
        },
        update: (_, mutationResult) => {
          const updatedUser = mutationResult.data.deactivateUser;
          console.log(updatedUser);
        }
      });
      dispatch('action-complete');
      actionsDisabled = false;
    } catch(err) {
      console.log('ERROR: ', err);
    }
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
  <Button style="link" variant={buttonVariant} label="Deactivate" action={handleDeactivate}/>
</nav>