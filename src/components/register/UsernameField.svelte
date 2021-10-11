<script>
  import { mutation } from 'svelte-apollo';
  import { VALIDATE_USERNAME_AND_EMAIL } from 'graphql/queries/user';
  import ValidationTextInput from 'components/forms/ValidationTextInput.svelte';

  export let formDisabled;

  let inputInvalid = false;

  const validateUsernameAndEmail = mutation(VALIDATE_USERNAME_AND_EMAIL);

  const handleValidation = async e => {
    const validate = await validateUsernameAndEmail({
      variables: {
        login: e.detail.value
      }
    });

    console.log('Validate: ', e.detail.value)

    const isUniqueValue = validate.data.validateUsernameAndEmail;

    inputInvalid = !isUniqueValue;
  }
</script>

<div class="input-container">
  <ValidationTextInput
    id="username"
    label="Username"
    disabled={formDisabled}
    {inputInvalid}
    on:validate={handleValidation}
  />
</div>
