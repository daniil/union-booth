<script>
  import { stores } from '@sapper/app';
  import { createEventDispatcher } from 'svelte';
  import { mutation } from 'svelte-apollo';
  import { COHORT_USERS, COHORT_TEAM_USERS, PROGRAM_USERS, UPDATE_USER_ACTIVE_STATUS } from 'graphql/queries/admin/users';
  import Dropdown from 'components/forms/Dropdown.svelte';
  import Button from 'components/forms/Button.svelte';

  export let user;

  const { session } = stores();
  const dispatch = createEventDispatcher();

  const updateUserActiveStatus = mutation(UPDATE_USER_ACTIVE_STATUS);

  const userRoles = [
    { id: 1, value: "user", text: 'User' },
    { id: 2, value: "moderator", text: 'Moderator' },
    { id: 3, value: "manager", text: 'Manager' },
    { id: 4, value: "admin", text: 'Admin' }
  ];

  let actionsDisabled = false;
  const queries = {
    user: { query: COHORT_USERS, key: 'cohortUsers' },
    moderator: { query: COHORT_TEAM_USERS, key: 'cohortTeamUsers' },
    manager: { query: PROGRAM_USERS, key: 'programUsers' },
    admin: { query: PROGRAM_USERS, key: 'programUsers' }
  };

  $: buttonVariant = actionsDisabled ? 'loading' : user.isInactive ? '' : 'danger';
  $: activeStatusLabel = user.isInactive ? 'Activate' : 'Deactivate';

  const handleUpdateStatus = async () => {
    try {
      actionsDisabled = true;

      await updateUserActiveStatus({
        variables: {
          id: user.id,
          isInactive: !user.isInactive
        },
        update: (_, mutationResult) => {
          const updatedUser = mutationResult.data.updateUserActiveStatus;
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
  <Dropdown
    label="Role"
    value={user.role}
    options={userRoles}
  />
  <Button style="link" variant={buttonVariant} label={activeStatusLabel} action={handleUpdateStatus}/>
</nav>