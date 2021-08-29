<script>
  import { stores } from '@sapper/app';
  import { onDestroy } from 'svelte';
  import { mutation } from 'svelte-apollo';
  import parseError from 'utils/parseError';
  import { USER, UPDATE_USER_INFO } from 'graphql/queries/user';
  import TextInput from 'components/forms/TextInput.svelte';
  import Button from 'components/forms/Button.svelte';
  import Loading from 'components/shared/Loading.svelte';
  import FormErrors from 'components/forms/FormErrors.svelte';

  export let user;

  const { session } = stores();

  const updateUserInfo = mutation(UPDATE_USER_INFO);

  let userInfo;
  let errors;
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
  
  const handleUpdate = async e => {
    formDisabled = true;
    errors = null;

    try {
      await updateUserInfo({
        variables: {
          userId: user.id,
          firstName: e.target.firstName.value,
          lastName: e.target.lastName.value,
          username: e.target.username.value,
          email: e.target.email.value
        },
        update: (_, mutationResult) => {
          const updatedUserInfo = mutationResult.data.updateUserInfo;

          $session.apolloClient.writeQuery({
            query: USER,
            variables: {
              id: user.id
            },
            data: {
              user: updatedUserInfo
            }
          });

          $session.user = updatedUserInfo;
          formDisabled = false;
        }
      })
    } catch(err) {
      formDisabled = false;
      errors = parseError(err);
    }
  }
</script>

<style lang="scss">
  form {
    position: relative;
    width: 100%;
    max-width: 20rem;
    @media (min-width: 48rem) {
      width: 30%;
      max-width: inherit;
      min-width: 15rem;
    }
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
  <FormErrors {errors}/>
  {#if fetchingData}
    <div class="loading-container">
      <div class="loading-wrapper">
        <Loading/>
      </div>
    </div>
  {/if}
</form>