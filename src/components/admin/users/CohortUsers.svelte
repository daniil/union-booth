<script>
  import { stores } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import { COHORT_USERS } from 'graphql/queries/admin/users';
  import Loading from 'components/shared/Loading.svelte';
  import CohortUser from 'components/admin/users/CohortUser.svelte';

  export let cohortId;

  const { session } = stores();

  let users = [];
  let loading = true;

  $: usersSub = watchUsersQuery(cohortId);

  const watchUsersQuery = cohortId => {
    return $session.apolloClient
      .watchQuery({
        query: COHORT_USERS,
        variables: {
          cohortId
        },
        fetchPolicy: 'cache-and-network'
      })
      .subscribe(({ data }) => {
        if (!data) return;
        users = data.cohortUsers;
        loading = false;
      })
  }

  onDestroy(() => usersSub.unsubscribe());
</script>

{#if loading}
  <Loading/>
{:else}
  {#each users as user (user.id)}
    <CohortUser {user}/>
  {:else}
    <p>No users yet.</p>
  {/each}
{/if}