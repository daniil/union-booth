<script>
  import { stores } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import TextInput from 'components/TextInput.svelte';
  import Button from 'components/Button.svelte';
  import Loading from 'components/Loading.svelte';
  import { USER } from 'graphql/queries/user';

  export let user;

  const { session } = stores();

  let userInfo;
  let formDisabled = false;
  let fetchingData = true;

  $: buttonVariant = formDisabled ? 'loading' : 'success';

  const userInfoSub = $session.apolloClient
    .watchQuery({
      query: USER,
      variables: {
        id: user.id
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
  
  const handleUpdate = e => {
    console.log('Update');
  }
</script>

<style lang="scss">
  form {
    position: relative;
    width: 30%;
  }
  .form-element {
    margin-bottom: 1rem;
    &.action {
      display: flex;
      justify-content: center;
      padding-top: 1rem;
      border-top: 1px solid #DBD3D8;
    }
  }
  .loading-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255,255,255,0.75);
  }
  .loading-wrapper {
    background-color: rgba(255,255,255,0.9);
    border-radius: 6px;
    padding: 0.5rem 4rem;
    box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
  }
</style>

<form action="/update" method="post" on:submit|preventDefault={handleUpdate}>
  <div class="form-element">
    <TextInput id="firstName" type="text" label="First Name" value={userInfo?.firstName} required disabled={formDisabled}/>
  </div>
  <div class="form-element">
    <TextInput id="lastName" type="text" label="Last Name" value={userInfo?.lastName} required disabled={formDisabled}/>
  </div>
  <div class="form-element">
    <TextInput id="username" type="text" label="Username" value={userInfo?.username} required disabled={formDisabled}/>
  </div>
  <div class="form-element">
    <TextInput id="email" type="email" label="Email" value={userInfo?.email} required disabled={formDisabled}/>
  </div>
  <div class="form-element action">
    <Button type="submit" variant={buttonVariant} icon="🪄" label="Update"/>
  </div>
  {#if fetchingData}
    <div class="loading-container">
      <div class="loading-wrapper">
        <Loading/>
      </div>
    </div>
  {/if}
</form>