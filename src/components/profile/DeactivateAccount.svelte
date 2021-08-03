<script>
  import { goto, stores } from '@sapper/app';
  import { mutation } from 'svelte-apollo';
  import { DEACTIVATE_USER_ACCOUNT } from 'graphql/queries/user';
  import ConfirmationButton from 'components/forms/ConfirmationButton.svelte';
  import Loading from 'components/shared/Loading.svelte';

  const { session } = stores();

  const deactivateUserAccount = mutation(DEACTIVATE_USER_ACCOUNT);

  let loading = false;

  const handleDeactivate = async () => {
    loading = true;
    await deactivateUserAccount();
    loading = false;
    $session.user = null;
		goto('/');
  }
</script>

<style>
  .deactivate-container {
    display: flex;
    justify-content: center;
    position: relative;
  }
  .loading-container {
    position: absolute;
    top: -6px;
  }
</style>

<div class="deactivate-container">
  {#if loading}
    <div class="loading-container">
      <Loading/>
    </div>
  {:else}
    <ConfirmationButton style="link" variant="danger" label="Deactivate Account" action={handleDeactivate}/>
  {/if}
</div>