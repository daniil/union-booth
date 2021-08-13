<script>
  import { stores } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import { PROGRAM_USERS } from 'graphql/queries/admin/users';
  import Loading from 'components/shared/Loading.svelte';
  import UsersHeader from 'components/admin/users/UsersHeader.svelte';
  import UserRow from 'components/admin/users/UserRow.svelte';
  import filterUsers from './filterUsers';

  export let filter;

  const { session } = stores();

  let users = [];
  let loading = true;

  $: usersSub = watchUsersQuery();
  $: filteredUsers = filterUsers(users, filter);

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