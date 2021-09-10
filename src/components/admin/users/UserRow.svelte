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
    align-items: flex-start;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.5rem 0.5rem;
    margin: 0.25rem 0 1rem;
    font-size: 0.85rem;
    @media (min-width: 48rem) {
      flex-direction: row;
      align-items: center;
      gap: 0;
      margin: 0.25rem 0;
    }
    &:nth-of-type(even) {
      background-color: rgba(219, 211, 216, 0.125);
    }
    &.inactive .cell {
      opacity: 0.6;
    }
  }
  .cell-wrapper {
    display: flex;
    align-items: flex-start;
    width: 100%;
    @media (min-width: 48rem) {
      display: block;
      width: 21%;
    }
    &.date-joined {
      @media (min-width: 48rem) {
        width: 16%;
      }
    }
  }
  .header-cell {
    width: 12rem;
    font-weight: 300;
    opacity: 0.6;
    @media (min-width: 48rem) {
      display: none;
    }
  }
  .cell {
    width: 100%;
    white-space: normal;
    padding-right: 0.5rem;
    transition: opacity 0.25s;
    @media (min-width: 48rem) {
      display: block;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
  .admin-icon {
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 1rem;
    @media (min-width: 48rem) {
      right: 100%;
      bottom: auto;
      font-size: 0.85rem;
    }
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
  <span class="cell-wrapper first-name">
    <span class="header-cell">First Name:</span>
    <span class="cell" title={user.firstName}>{user.firstName}</span>
  </span>
  <span class="cell-wrapper last-name">
    <span class="header-cell">Last Name:</span>
    <span class="cell" title={user.lastName}>{user.lastName}</span>
  </span>
  <span class="cell-wrapper username">
    <span class="header-cell">Username:</span>
    <span class="cell" title={user.username}>{user.username}</span>
  </span>
  <span class="cell-wrapper email">
    <span class="header-cell">Email:</span>
    <span class="cell" title={user.email}>{user.email}</span>
  </span>
  <span class="cell-wrapper date-joined">
    <span class="header-cell">Date Joined:</span>
    <span class="cell" title={createdDate}>{createdDate}</span>
  </span>
  <span class="actions-container" data-id={user.id}>
    <UserActions {user}/>
  </span>
</p>