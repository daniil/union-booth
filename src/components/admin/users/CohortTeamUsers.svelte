<script>
  import { stores } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import { COHORT_TEAM_USERS } from 'graphql/queries/admin/users';
  import Loading from 'components/shared/Loading.svelte';
  import UsersHeader from 'components/admin/users/UsersHeader.svelte';
  import UserRow from 'components/admin/users/UserRow.svelte';
  import filterUsers from './filterUsers';

  export let cohortId;
  export let filter;

  const { session } = stores();

  let users = [];
  let loading = true;

  $: usersSub = watchUsersQuery(cohortId);
  $: filteredUsers = filterUsers(users, filter);

  const watchUsersQuery = cohortId => {
    return $session.apolloClient
      .watchQuery({
        query: COHORT_TEAM_USERS,
        variables: {
          cohortId
        },
        fetchPolicy: 'cache-and-network'
      })
      .subscribe(({ data }) => {
        if (!data) return;
        users = data.cohortTeamUsers;
        loading = false;
      })
  }

  onDestroy(() => usersSub.unsubscribe());
</script>

<style>
  .no-users {
    text-align: center;
    color: rgba(85, 67, 72, 0.7);
  }
</style>

{#if loading}
  <Loading/>
{:else}
  {#if filteredUsers.length}
    <UsersHeader/>
  {/if}
  {#each filteredUsers as user (user.id)}
    <UserRow {user}/>
  {:else}
    <p class="no-users">No users with this filter.</p>
  {/each}
{/if}