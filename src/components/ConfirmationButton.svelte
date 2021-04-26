<script>
  export let type;
  export let style;
  export let variant;
  export let icon;
  export let label;
  export let action;
  export let disabled;
  export let preventDefault;

  import Button from 'components/Button.svelte';

  let confirmationActive = false;

  const handleAction = () => {
    confirmationActive = true;
  }

  const handleYes = () => {
    action();
    confirmationActive = false;
  }

  const handleNo = () => {
    confirmationActive = false;
  }
</script>

<style>
  .confirmation-button {
    position: relative;
    display: inline-flex;
  }
  .confirmation {
    display: flex;
    position: absolute;
    bottom: -100%;
    left: 50%;
    transform: translateX(-50%);
  }
  .confirming {
    filter: blur(3px);
    pointer-events: none;
  }
</style>

<div class="confirmation-button">
  <span class:confirming={confirmationActive}>
    <Button
      {type}
      {style}
      {variant}
      {icon}
      {label}
      {disabled}
      {preventDefault}
      action={handleAction}
    />
  </span>
  {#if confirmationActive}
    <div
      class="confirmation">
      <button on:click={handleYes}>Yes</button>
      <button on:click={handleNo}>No</button>
    </div>
  {/if}
</div>