<script>
  import { stores } from '@sapper/app';
  import { createEventDispatcher } from 'svelte';
  import { mutation } from 'svelte-apollo';
  import {
    COHORT_USERS,
    COHORT_TEAM_USERS,
    PROGRAM_USERS,
    UPDATE_USER_ACTIVE_STATUS,
    UPDATE_USER_ROLE
  } from 'graphql/queries/admin/users';
  import Dropdown from 'components/forms/Dropdown.svelte';
  import Button from 'components/forms/Button.svelte';

  export let user;

  const { session } = stores();
  const dispatch = createEventDispatcher();

  const updateUserActiveStatus = mutation(UPDATE_USER_ACTIVE_STATUS);
  const updateUserRole = mutation(UPDATE_USER_ROLE);

  const userRoles = [
    { id: 1, value: "user", text: 'User', permissions: ['manager', 'admin'] },
    { id: 2, value: "moderator", text: 'Moderator', permissions: ['manager', 'admin'] },
    { id: 3, value: "manager", text: 'Manager', permissions: ['admin'] },
    { id: 4, value: "admin", text: 'Admin', permissions: ['admin'] }
  ].filter(userRole => {
    return userRole.permissions.includes($session.user.role);
  });

  let deactivateBtnLoading = false;
  let roleDropdownLoading = false;

  const queries = {
    user: { query: COHORT_USERS, key: 'cohortUsers' },
    moderator: { query: COHORT_TEAM_USERS, key: 'cohortTeamUsers' },
    manager: { query: PROGRAM_USERS, key: 'programUsers' },
    admin: { query: PROGRAM_USERS, key: 'programUsers' }
  };

  $: buttonVariant = deactivateBtnLoading ? 'loading' : user.isInactive ? '' : 'danger';
  $: activeStatusLabel = user.isInactive ? 'Activate' : 'Deactivate';

  const handleUpdateStatus = async () => {
    try {
      deactivateBtnLoading = true;

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
      deactivateBtnLoading = false;
    } catch(err) {
      console.log('ERROR: ', err);
    }
  }

  const handleRoleSelect = async e => {
    try {
      roleDropdownLoading = true;

      await updateUserRole({
        variables: {
          id: user.id,
          newRole: e.detail.option.value
        },
        update: (_, mutationResult) => {
          const updatedUser = mutationResult.data.updateUserRole;
          const prevRoleUserQuery = queries[user.role];
          const updatedUserQuery = queries[updatedUser.role];

          const prevRoleUsers = $session.apolloClient.readQuery({
            query: prevRoleUserQuery.query,
            variables: {
              cohortId: updatedUser.cohortId
            }
          })[prevRoleUserQuery.key];

          $session.apolloClient.writeQuery({
            query: prevRoleUserQuery.query,
            variables: {
              cohortId: updatedUser.cohortId
            },
            data: {
              [prevRoleUserQuery.key]: prevRoleUsers.filter(user => updatedUser.id !== user.id)
            }
          });

          const updatedRoleUsers = $session.apolloClient.readQuery({
            query: updatedUserQuery.query,
            variables: {
              cohortId: updatedUser.cohortId
            }
          })[updatedUserQuery.key];

          $session.apolloClient.writeQuery({
            query: updatedUserQuery.query,
            variables: {
              cohortId: updatedUser.cohortId
            },
            data: {
              [updatedUserQuery.key]: updatedRoleUsers.concat([updatedUser]).sort(sortUsersAlphabetic)
            }
          })
        }
      });

      dispatch('action-complete');
    } catch(err) {
      console.log('ERROR: ', err);
    }
  }

  const sortUsersAlphabetic = (a,b) => {
    if (a.firstName < b.firstName) {
      return -1;
    }
    if (a.firstName > b.firstName) {
      return 1;
    }
    if (a.lastName < b.lastName) {
      return -1;
    }
    if (a.lastName > b.lastName) {
      return 1;
    }
    return 0;
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
    loading={roleDropdownLoading}
    on:select={handleRoleSelect}
  />
  <Button style="link" variant={buttonVariant} label={activeStatusLabel} action={handleUpdateStatus}/>
</nav>