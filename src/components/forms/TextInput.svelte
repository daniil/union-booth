<script>
  export let id;
  export let type;
  export let label;
  export let labelStyle;
  export let required;
  export let disabled;
  export let value;
  export let invalid;

  const handleInput = e => {
    value = e.target.value;
  }
</script>

<style lang="scss">
  label {
    display: block;
    margin-bottom: 0.25rem;
    color: #7D6D61;
    font-size: 0.8rem;
    &.admin {
      display: inline-block;
      margin-bottom: 0.5rem;
      color: #3E6990;
      font-size: 1rem;
    }
  }
  input {
    width: 100%;
    border: 1px solid #DBD3D8;
    border-radius: 4px;
    padding: 0.5rem 0.5rem;
    font-size: 0.9rem;
    &.invalid {
      outline: solid #E72350 1px;
      background: rgba(239, 108, 139, 0.15);
    }
  }
</style>

<label
  for={id}
  class:admin={labelStyle === 'admin'}
>
  {label}
</label>
<input
  type={type}
  name={id}
  id={id}
  placeholder={label}
  value={value || ''}
  class:invalid
  {required}
  {disabled}
  on:input={handleInput}
  on:blur
  on:keydown
  on:keypress
/>