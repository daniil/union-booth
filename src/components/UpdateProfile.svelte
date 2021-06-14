<script>
  import { stores } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import TextInput from 'components/TextInput.svelte';
  import Button from 'components/Button.svelte';
  import { USER } from 'graphql/queries/user';

  export let user;

  const { session } = stores();

  let userInfo;
  let formDisabled = false;

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
      }
    });

  onDestroy(() => userInfoSub.unsubscribe());
  
  const handleUpdate = e => {
    console.log('Update');
  }
</script>

<style lang="scss">
  form {
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
</form>