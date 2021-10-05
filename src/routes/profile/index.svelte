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
  import { onDestroy } from 'svelte';
  import { USER } from 'graphql/queries/user';
  import UpdateAvatar from 'components/profile/UpdateAvatar.svelte';
  import UpdateProfile from 'components/profile/UpdateProfile.svelte';
  import UpdatePassword from 'components/profile/UpdatePassword.svelte';
  import DeactivateAccount from 'components/profile/DeactivateAccount.svelte';

  const { session } = stores();

  let userInfo;
  let fetchingData = true;

  const userInfoSub = $session.apolloClient
    .watchQuery({
      query: USER,
      variables: {
        id: $session.user.id
      },
      fetchPolicy: 'cache-and-network'
    })
    .subscribe(({ data }) => {
      if (data) {
        userInfo = data.user;
        fetchingData = false;
      }
    });

  onDestroy(() => userInfoSub.unsubscribe());
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
    margin-bottom: 4rem;
    padding: 0 1rem;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    @media (min-width: 48rem) {
      align-items: flex-start;
      flex-direction: row;
      padding: 0;
    }
  }
</style>

<div class="container">
  <div class="wrapper">
    <h1>Profile</h1>
    <div class="profile-container">
      <UpdateAvatar user={$session.user}/>
      <UpdateProfile
        {userInfo}
        fetching={fetchingData}
      />
    </div>
    <UpdatePassword user={$session.user}/>
    <DeactivateAccount/>
  </div>
</div>

