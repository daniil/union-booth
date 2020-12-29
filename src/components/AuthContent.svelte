<script>
  import { stores } from "@sapper/app";
  const { session } = stores();

  export let role;

  const roleMap = {
    user: ['user'],
    moderator: ['user', 'moderator'],
    admin: ['user', 'moderator', 'admin']
  }

  export function checkAuth() {
    const userRoles = roleMap[$session.user.role];
    return userRoles.includes(role);
  }
</script>

{#if checkAuth()}
  <slot></slot>
{/if}