<script>
  export let id;
  export let label;
  export let checked
  export let disabled;
  export let color;
</script>

<style>
  .checkbox-container {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    white-space: nowrap;
  }
</style>

<div class="checkbox-container">
  <input
    type="checkbox"
    name="checkbox-{id}"
    id="checkbox-{id}"
    {checked}
    {disabled}
    on:change
  >
  <label for="checkbox-{id}" style="color: {color}">{label}</label>
</div>