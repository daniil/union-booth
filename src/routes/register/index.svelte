<svelte:head>
	<title>Union Booth :: Register</title>
</svelte:head>

<script>
  import { goto, stores } from '@sapper/app';
  import { mutation } from 'svelte-apollo';
  import { REGISTER } from 'graphql/queries/register';
  import parseError from 'utils/parseError';
  import FormErrors from 'components/forms/FormErrors.svelte';
  import UsernameField from 'components/register/UsernameField.svelte';
  import TextInput from 'components/forms/TextInput.svelte';
  import Radio from 'components/forms/Radio.svelte';
  import Button from 'components/forms/Button.svelte';

  const { session } = stores();
  const registerUser = mutation(REGISTER);

  let errors;
  let accountType = 'joinCohort';
  let cohortIdValue;
  let programIdValue;
  let formDisabled = false;

  $: buttonVariant = formDisabled ? 'loading' : 'success';

  const handleRegister = async function(e) {
    if (e.target.password.value !== e.target.passwordConfirm.value) {
      errors = '⚠️ Passwords do not match';
      return;
    }

    try {
      errors = null;
      formDisabled = true;

      const user = await registerUser({
        variables: {
          firstName: e.target.firstName.value,
          lastName: e.target.lastName.value,
          username: e.target.username.value,
          email: e.target.email.value,
          password: e.target.password.value,
          isProgramOwner: accountType === 'startProgram',
          cohortId: e.target.cohortId.value,
          programId: e.target.programId.value
        }
      });
      
      $session.user = user.data.register;
      goto('/');
    } catch(err) {
      formDisabled = false;
      errors = parseError(err);
    }
  }

  const toggleAccountType = e => {
    accountType = e.target.id;
    cohortIdValue = '';
    programIdValue = '';
  }
</script>

<style lang="scss">
  .container {
    display: flex;
    justify-content: center;
    padding: 0 1rem;
    @media (min-width: 48rem) {
      padding: 0;
    }
  }
  .wrapper {
    width: 100%;
    max-width: 23rem;
    @media (min-width: 48rem) {
      width: 40%;
      max-width: initial;
      min-width: 23rem;
    }
  }
  h1 {
    margin-bottom: 2rem;
    text-align: center;
    font-size: 1.5rem;
    color: rgba(0,0,0,0.7);
  }
  h3 {
    margin-bottom: 1rem;
    font-size: 1rem;
  }
  .form-block {
    display: flex;
    gap: 1.5rem;
  }
  .form-element {
    margin-bottom: 1rem;
    flex-grow: 1;
    &.action {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
      padding-top: 1.5rem;
      border-top: 1px solid #DBD3D8;
    }
    &.group {
      margin-bottom: 0.75rem;
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
  .account-section {
    margin-top: 1rem;
  }
  .hidden {
    display: none;
  }
</style>

<div class="container">
  <div class="wrapper">
    <h1>Register</h1>
    <form action="/register" method="post" on:submit|preventDefault={handleRegister}>
      <div class="form-block">
        <div class="form-element">
          <TextInput id="firstName" type="text" label="First Name" required disabled={formDisabled}/>
        </div>
        <div class="form-element">
          <TextInput id="lastName" type="text" label="Last Name" required disabled={formDisabled}/>
        </div>
      </div>
      <div class="form-block">
        <div class="form-element">
          <UsernameField disabled={formDisabled}/>
        </div>
        <div class="form-element">
          <TextInput id="email" type="email" label="Email" required disabled={formDisabled}/>
        </div>
      </div>
      <div class="form-block">
        <div class="form-element">
          <TextInput id="password" type="password" label="Password" required disabled={formDisabled}/>
        </div>
        <div class="form-element">
          <TextInput id="passwordConfirm" type="password" label="Confirm Password" required disabled={formDisabled}/>
        </div>
      </div>
      <div class="account-section">
        <h3>Account Type</h3>
        <div class="form-element group">
          <Radio id="joinCohort" name="accountType" label="I'm joining a cohort" on:change={toggleAccountType} selected disabled={formDisabled}/>
        </div>
        <div class="form-element group">
          <Radio id="joinProgram" name="accountType" label="I'm joining a program" on:change={toggleAccountType} disabled={formDisabled}/>
        </div>
        <div class="form-element">
          <Radio id="startProgram" name="accountType" label="I'm creating my own program" on:change={toggleAccountType} disabled={formDisabled}/>
        </div>
        <div class="form-element" class:hidden={accountType !== 'joinCohort'}>
          <TextInput id="cohortId" type="text" label="Cohort ID" bind:value={cohortIdValue} required={accountType === 'joinCohort'} disabled={formDisabled}/>
        </div>
        <div class="form-element" class:hidden={accountType !== 'joinProgram'}>
          <TextInput id="programId" type="text" label="Program ID" bind:value={programIdValue} required={accountType === 'joinProgram'} disabled={formDisabled}/>
        </div>
      </div>
      <div class="form-element action">
        <Button type="submit" variant={buttonVariant} icon="🎫" label="Register"/>
        <span class="or">or</span>
        <a href="/login" class="link">Login</a> 
      </div>
    </form>
  </div>
</div>
<div class="container">
  <FormErrors {errors}/>
</div>