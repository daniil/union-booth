<script>
  import { stores } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import { PROGRAM_USERS } from 'graphql/queries/admin/users';
  import Loading from 'components/shared/Loading.svelte';
  import CohortUsersHeader from 'components/admin/users/CohortUsersHeader.svelte';
  import CohortUser from 'components/admin/users/CohortUser.svelte';

  const { session } = stores();

  let users = [];
  let loading = true;

  $: usersSub = watchUsersQuery();

  const watchUsersQuery = () => {
    return $session.apolloClient
      .watchQuery({
        query: PROGRAM_USERS,
        fetchPolicy: 'cache-and-network'
      })
      .subscribe(({ data }) => {
        if (!data) return;
        users = data.programUsers;
        loading = false;
      })
  }

  onDestroy(() => usersSub.unsubscribe());
</script>

{#if loading}
  <Loading/>
{:else}
  {#if users.length}
    <CohortUsersHeader/>
  {/if}
  {#each users as user (user.id)}
    <CohortUser {user}/>
  {:else}
    <p>No users yet.</p>
  {/each}
{/if}