<script>
  import { formatDate } from 'utils/time';
  import UserActions from 'components/admin/users/UserActions.svelte';

  export let user;

  $: createdDate = formatDate(user.createdAt, true);
</script>

<style lang="scss">
  .user {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0.5rem;
    margin: 0.25rem 0;
    font-size: 0.85rem;
    &:nth-of-type(even) {
      background-color: rgba(219, 211, 216, 0.125);
    }
    &.inactive > .cell {
      opacity: 0.6;
    }
  }
  .cell {
    width: 21%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-right: 0.5rem;
    transition: opacity 0.25s;
    &.date-joined {
      width: 16%;
    }
  }
  .admin-icon {
    position: absolute;
    right: 100%;
  }
  .actions-container {
    position: absolute;
    right: -4px;
    display: flex;
  }
</style>

<p class="user" class:inactive={user.isInactive}>
  {#if user.role === 'admin'}
    <span class="admin-icon" title="Admin">⭐</span>
  {/if}
  <span class="cell first-name" title={user.firstName}>{user.firstName}</span>
  <span class="cell last-name" title={user.lastName}>{user.lastName}</span>
  <span class="cell username" title={user.username}>{user.username}</span>
  <span class="cell email" title={user.email}>{user.email}</span>
  <span class="cell date-joined" title={createdDate}>{createdDate}</span>
  <span class="actions-container" data-id={user.id}>
    <UserActions {user}/>
  </span>
</p>