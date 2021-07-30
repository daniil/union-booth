<script>
  import { stores } from '@sapper/app';
  import { createEventDispatcher } from 'svelte';
  import { mutation } from 'svelte-apollo';
  import { COHORT_USERS, COHORT_TEAM_USERS, PROGRAM_USERS, DEACTIVATE_USER } from 'graphql/queries/admin/users';
  import Button from 'components/forms/Button.svelte';

  export let userId;

  const { session } = stores();
  const dispatch = createEventDispatcher();

  const deactivateUser = mutation(DEACTIVATE_USER);

  let actionsDisabled = false;
  const queries = {
    user: { query: COHORT_USERS, key: 'cohortUsers' },
    moderator: { query: COHORT_TEAM_USERS, key: 'cohortTeamUsers' },
    manager: { query: PROGRAM_USERS, key: 'programUsers' },
    admin: { query: PROGRAM_USERS, key: 'programUsers' }
  };

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
          const userQuery = queries[updatedUser.role];

          const currentUsers = $session.apolloClient.readQuery({
            query: userQuery.query,
            variables: {
              cohortId: updatedUser.cohortId
            }
          })[userQuery.key];

          $session.apolloClient.writeQuery({
            query: userQuery.query,
            variables: {
              cohortId: updatedUser.cohortId
            },
            data: {
              [userQuery.key]: currentUsers.map(user => {
                if (updatedUser.id === user.id) {
                  return updatedUser;
                } else {
                  return user;
                }
              })
            }
          });
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