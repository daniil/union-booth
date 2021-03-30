<script>
  export let id;
  export let label;
</script>

<style>
  .checkbox-container {
    display: flex;
    align-items: center;
  }
  label {
    margin-left: 0.5rem;
    color: #7D6D61;
    font-size: 0.9rem;
  }
</style>

<div class="checkbox-container">
  <input type="checkbox" name={id} id={id} on:change/>
  <label for={id} class="inline">{label}</label>
</div>