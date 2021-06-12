<script>
  import TextInput from 'components/TextInput.svelte';
  import Button from 'components/Button.svelte';

  export let user;

  let formDisabled = false;

  $: buttonVariant = formDisabled ? 'loading' : 'success';

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
    <TextInput id="firstName" type="text" label="First Name" required disabled={formDisabled}/>
  </div>
  <div class="form-element">
    <TextInput id="lastName" type="text" label="Last Name" required disabled={formDisabled}/>
  </div>
  <div class="form-element">
    <TextInput id="username" type="text" label="Username" required disabled={formDisabled}/>
  </div>
  <div class="form-element">
    <TextInput id="email" type="email" label="Email" required disabled={formDisabled}/>
  </div>
  <div class="form-element action">
    <Button type="submit" variant={buttonVariant} icon="🪄" label="Update"/>
  </div>
</form>