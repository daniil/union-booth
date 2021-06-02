<svelte:head>
	<title>Union Booth :: Login</title>
</svelte:head>

<script>
  import { goto, stores } from '@sapper/app';
  import { mutation } from 'svelte-apollo';
  import { LOGIN } from 'graphql/queries/login';
  import parseError from 'utils/parseError';
  import FormErrors from 'components/FormErrors.svelte';
  import TextInput from 'components/TextInput.svelte';
  import Button from 'components/Button.svelte';

  const { session } = stores();
  const loginUser = mutation(LOGIN);

  let errors;
  let formDisabled = false;

  $: buttonVariant = formDisabled ? 'loading' : 'success';

  const handleLogin = async function(e) {
    try {
      errors = null;
      formDisabled = true;

      const user = await loginUser({
        variables: {
          login: e.target.email.value,
          password: e.target.password.value
        }
      });
      
      $session.user = user.data.login;
      goto('/');
    } catch(err) {
      formDisabled = false;
      errors = parseError(err);
    }
  }
</script>

<style lang="scss">
  .container {
    display: flex;
    justify-content: center;
  }
  h1 {
    text-align: center;
    font-size: 1.5rem;
    color: rgba(0,0,0,0.7);
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

<div class="container">
  <div class="wrapper">
    <h1>Login</h1>
    <form action="/login" method="post" on:submit|preventDefault={handleLogin}>
      <div class="form-element">
        <TextInput id="email" type="text" label="Email or Username" required disabled={formDisabled}/>
      </div>
      <div class="form-element">
        <TextInput id="password" type="password" label="Password" required disabled={formDisabled}/>
      </div>
      <div class="form-element action">
        <Button type="submit" variant={buttonVariant} icon="🔑" label="Login"/>
      </div>
    </form>
  </div>
</div>
<div class="container">
  <FormErrors {errors}/>
</div>
