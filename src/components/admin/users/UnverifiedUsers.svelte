<script>
  import { stores } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import { UNVERIFIED_USERS } from 'graphql/queries/admin/users';
  import Loading from 'components/shared/Loading.svelte';
  import UsersHeader from 'components/admin/users/UsersHeader.svelte';
  import UserRow from 'components/admin/users/UserRow.svelte';

  export let cohortId;
  export let actions;

  const { session } = stores();

  let users = [];
  let loading = true;

  $: usersSub = watchUsersQuery();

  const watchUsersQuery = () => {
    return $session.apolloClient
      .watchQuery({
        query: UNVERIFIED_USERS,
        variables: {
          cohortId
        },
        fetchPolicy: 'cache-and-network'
      })
      .subscribe(({ data }) => {
        if (!data) return;
        users = data.unverifiedUsers;
        loading = false;
      })
  }

  onDestroy(() => usersSub.unsubscribe());
</script>

<style lang="scss">
  @use '../../../styles/partials/admin';
  .no-users {
    @extend %no-users;
  }
</style>

{#if loading}
  <Loading/>
{:else}
  {#if users.length}
    <UsersHeader/>
  {/if}
  {#each users as user (user.id)}
    <UserRow {user} {actions}/>
  {:else}
    <p class="no-users">No users left to verify 👌</p>
  {/each}
{/if}