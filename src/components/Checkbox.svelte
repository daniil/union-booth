<script>
  export let id;
  export let label;
</script>

<style>
  label {
    margin-left: 0.5rem;
    color: #7D6D61;
    font-size: 0.9rem;
  }
</style>

<input type="checkbox" name={id} id={id} on:change/>
<label for={id} class="inline">{label}</label>