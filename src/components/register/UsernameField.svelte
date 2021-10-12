<script>
  import { mutation } from 'svelte-apollo';
  import { VALIDATE_USERNAME_AND_EMAIL } from 'graphql/queries/user';
  import ValidationTextInput from 'components/forms/ValidationTextInput.svelte';

  export let value;
  export let disabled;
  
  let inputInvalid = false;

  const validateUsernameAndEmail = mutation(VALIDATE_USERNAME_AND_EMAIL);

  const handleValidation = async e => {
    const validate = await validateUsernameAndEmail({
      variables: {
        login: e.detail.value
      }
    });

    const isUniqueValue = validate.data.validateUsernameAndEmail;

    inputInvalid = !isUniqueValue;
  }

  const handleKeyDown = () => {
    inputInvalid = false;
  }
</script>

<div class="input-container">
  <ValidationTextInput
    id="username"
    label="Username"
    {value}
    {disabled}
    {inputInvalid}
    validationMessage="Username already in use"
    on:validate={handleValidation}
    on:keydown={handleKeyDown}
  />
</div>
