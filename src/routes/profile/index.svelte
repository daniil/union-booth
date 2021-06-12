<svelte:head>
	<title>Union Booth :: Profile</title>
</svelte:head>

<script context="module">
  export async function preload(_, session) {
    if (!session.user) {
      return this.redirect(302, '');
    }

    return { session }
  }
</script>

<script>
  import { stores } from '@sapper/app';
  import UpdateAvatar from 'components/UpdateAvatar.svelte';
  import UpdateProfile from 'components/UpdateProfile.svelte';

  const { session } = stores();
</script>

<style lang="scss">
  .container {
    display: flex;
    justify-content: center;
  }
  .wrapper {
    flex-grow: 1;
  }
  h1 {
    margin-bottom: 2rem;
    text-align: center;
    font-size: 1.5rem;
    color: rgba(0,0,0,0.7);
  }
  .profile-container {
    display: flex;
    gap: 4rem;
    justify-content: center;
  }
</style>

<div class="container">
  <div class="wrapper">
    <h1>Profile</h1>
    <div class="profile-container">
      <UpdateAvatar user={$session.user}/>
      <UpdateProfile user={$session.user}/>
    </div>
  </div>
</div>

