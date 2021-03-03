<script>
  export let type;
  export let icon;
  export let label;
  export let action;
</script>

<style>
  .button {
    display: inline-flex;
    align-items: center;
    background: rgba(219, 211, 216, 0.3);
    border: none;
    border-radius: 4px;
    padding: 0.25rem 0.75rem;
    cursor: pointer;
    font-size: 1.3rem;
  }
  .button:hover {
    background: rgba(219, 211, 216, 0.5);
  }
  .button:hover .button-text {
    text-shadow: 1px 1px 0px rgba(255,255,255,0.75);
  }
  .button-text {
    font-size: 0.9rem;
    margin-left: 0.5rem;
    color: #05668D;
  }
</style>

<button type={type} class="button" on:click={action}>
  {icon}
  <span class="button-text">{label}</span>
</button>