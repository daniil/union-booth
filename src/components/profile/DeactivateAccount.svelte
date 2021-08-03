<script>
  import { goto, stores } from '@sapper/app';
  import ConfirmationButton from 'components/forms/ConfirmationButton.svelte';
  import { mutation } from 'svelte-apollo';
  import { DEACTIVATE_USER_ACCOUNT } from 'graphql/queries/user';

  const { session } = stores();

  const deactivateUserAccount = mutation(DEACTIVATE_USER_ACCOUNT);

  const handleDeactivate = async () => {
    await deactivateUserAccount();
    $session.user = null;
		goto('/');
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