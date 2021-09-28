<script>
  export let id;
  export let name;
  export let label;
  export let selected;
  export let disabled;
</script>

<style>
  .radio-container {
    display: flex;
    align-items: center;
  }
  input {
    margin: 0;
  }
  label {
    margin-left: 0.5rem;
    padding-top: 0.075rem;
    color: #7D6D61;
    font-size: 0.9rem;
  }
</style>

<div class="radio-container">
  <input type="radio" name={name} id={id} on:change checked={selected} {disabled}/>
  <label for={id} class="inline">{label}</label>
</div>