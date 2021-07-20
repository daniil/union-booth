<script>
  import { formatDate } from 'utils/time';

  export let user;

  $: createdDate = formatDate(user.createdAt, true);
</script>

<style lang="scss">
  .user {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0.5rem;
    margin: 0.5rem 0;
    &:nth-of-type(even) {
      background-color: rgba(219, 211, 216, 0.125);
    }
  }
  .cell {
    width: 20%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>

<p class="user">
  <span class="cell first-name" title={user.firstName}>{user.firstName}</span>
  <span class="cell last-name" title={user.lastName}>{user.lastName}</span>
  <span class="cell username" title={user.username}>{user.username}</span>
  <span class="cell email" title={user.email}>{user.email}</span>
  <span class="cell date-joined" title={createdDate}>{createdDate}</span>
</p>