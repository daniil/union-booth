<script>
  export let type;
  export let variant;
  export let icon;
  export let label;
  export let action;
  export let disabled;
  export let preventDefault;

  const handleAction = e => {
    !!preventDefault && e.preventDefault();
    !!action && action(e);
  }
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
  .button:not(:disabled):hover {
    background: rgba(219, 211, 216, 0.5);
  }
  .button:hover .button-text {
    text-shadow: 1px 1px 0px rgba(255,255,255,0.75);
  }
  .button:disabled {
    opacity: 0.6;
    filter: grayscale(1);
    cursor: not-allowed;
  }
  .button-text {
    font-size: 0.9rem;
    margin-left: 0.5rem;
    color: #05668D;
  }

  .button.success {
    background: rgba(188, 217, 121, 0.3);
  }
  .button.success:hover {
    background: rgba(188, 217, 121, 0.5);
  }
  .button.success > .button-text {
    color: #395647;
  }

  .button.link,
  .button.link:not(:disabled):hover {
    background: none;
    font-weight: bold;
  }
  .button.link > .button-text {
    border-bottom: 1px solid currentColor;
  }
  .button.link:not(:disabled):hover > .button-text {
    color: #078CC5;
    border-bottom: none;
  }
</style>

<button
  type={type}
  class="button"
  class:success={variant === 'success'}
  class:link={variant === 'link'}
  disabled={disabled}
  on:click={handleAction}
>
  {#if icon}
    {icon}
  {/if}
  <span class="button-text">{label}</span>
</button>