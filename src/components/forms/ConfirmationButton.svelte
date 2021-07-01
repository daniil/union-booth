<script>
  export let type;
  export let style;
  export let variant;
  export let icon;
  export let label;
  export let action;
  export let disabled;
  export let preventDefault;

  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import Button from 'components/forms/Button.svelte';

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
    top: 75%;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.5rem 0.25rem;
    background-color: rgba(255,255,255,0.9);
    box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
  }
  .button-wrapper {
    transition: filter 0.3s, opacity 0.3s;
  }
  .confirming {
    filter: blur(2px);
    opacity: 0.5;
    pointer-events: none;
  }
  
</style>

<div class="confirmation-button">
  <span class="button-wrapper" class:confirming={confirmationActive}>
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
      class="confirmation"
      transition:fly="{{ duration: 300, y: 5, opacity: 0, easing: quintOut }}">
      <Button style="link" variant="danger" label="Yes" action={handleYes}/>
      <Button style="link" label="No" action={handleNo}/>
    </div>
  {/if}
</div>