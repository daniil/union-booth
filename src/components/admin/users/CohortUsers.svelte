<script>
  import { stores } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import { COHORT_USERS } from 'graphql/queries/admin/users';

  export let cohortId;

  const { session } = stores();

  let users = [];

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
      })
  }

  onDestroy(() => usersSub.unsubscribe());
</script>

<ul>
  {#each users as user (user.id)}
    <li>{user.firstName} {user.lastName} ({user.username})</li>
  {/each}
</ul>