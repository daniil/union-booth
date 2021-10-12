<script>
  import { mutation } from 'svelte-apollo';
  import { VALIDATE_USERNAME_AND_EMAIL } from 'graphql/queries/user';
  import ValidationTextInput from 'components/forms/ValidationTextInput.svelte';

  export let id;
  export let label;
  export let value;
  export let disabled;
  export let validationMessage;
  
  let inputInvalid = false;

  const validateUsernameAndEmail = mutation(VALIDATE_USERNAME_AND_EMAIL);

  const handleValidation = async e => {
    if (value && value === e.detail.value) {
      inputInvalid = false;
      return;
    }

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
    {id}
    {label}
    {value}
    {disabled}
    {inputInvalid}
    {validationMessage}
    on:validate={handleValidation}
    on:keydown={handleKeyDown}
  />
</div>
