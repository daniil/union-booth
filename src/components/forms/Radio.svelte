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
    align-items: flex-start;
  }
  input {
    margin: 0.225rem 0 0 0;
  }
  label {
    margin-left: 0.5rem;
    color: #7D6D61;
    font-size: 0.9rem;
  }
</style>

<div class="radio-container">
  <input type="radio" name={name} id={id} on:change checked={selected} {disabled}/>
  <label for={id} class="inline">{label}</label>
</div>