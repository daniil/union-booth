<script>
  export let user;
</script>

<style>
  .avatar {
    width: 30px;
    margin-right: 1rem;
  }
  .anon {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30px;
    border-radius: 50%;
    background-color: #D3D3D3;
    color: #808080;
  }
</style>

{#if !user}
  <div class="avatar anon">?</div>
{:else}
  <img
    class="avatar"
    src={`avatars/${user.id}.svg`}
    alt={`Posted by: ${user.username}`}
    title={`Posted by: ${user.username}`}
  />
{/if}