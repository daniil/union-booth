<script>
  import { stores } from '@sapper/app';
  import roleMap from 'utils/role-map';

  export let role;

  const { session } = stores();

  export function checkAuth() {
    const userRoles = roleMap[$session.user.role];
    return userRoles.includes(role);
  }
</script>

{#if checkAuth()}
  <slot></slot>
{/if}