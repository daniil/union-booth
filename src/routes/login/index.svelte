<svelte:head>
	<title>Union Booth :: Login</title>
</svelte:head>

<script>
  import { goto, stores } from '@sapper/app';
  import { mutation } from 'svelte-apollo';
  import { LOGIN } from 'graphql/queries/login';
  import parseError from 'utils/parseError';
  import FormErrors from 'components/forms/FormErrors.svelte';
  import TextInput from 'components/forms/TextInput.svelte';
  import Button from 'components/forms/Button.svelte';

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
  .wrapper {
    width: 100%;
    max-width: 15.6rem;
    @media (min-width: 48rem) {
      width: 30%;
      max-width: initial;
      min-width: 15.6rem;
    }
  }
  h1 {
    margin-bottom: 2rem;
    text-align: center;
    font-size: 1.5rem;
    color: rgba(0,0,0,0.7);
  }
  .form-element {
    margin-bottom: 1rem;
    &.action {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding-top: 1.5rem;
      border-top: 1px solid #DBD3D8;
    }
  }
  .or {
    opacity: 0.5;
    font-size: 0.75rem;
  }
  .link {
    color: #05668F;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.85rem;
    &:hover {
      filter: brightness(1.25);
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
        <span class="or">or</span>
        <a href="/register" class="link">Register</a> 
      </div>
    </form>
  </div>
</div>
<div class="container">
  <FormErrors {errors}/>
</div>
