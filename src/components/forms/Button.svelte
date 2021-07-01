<script>
  import Loading from 'components/shared/Loading.svelte';

  export let type;
  export let style;
  export let variant;
  export let icon;
  export let label;
  export let action;
  export let disabled;
  export let preventDefault;

  $: disabledOverride = overrideDisabled(variant);

  const overrideDisabled = (variant) => {
    if (variant === 'loading') {
      return true;
    }
    return false;
  }
  
  const handleAction = e => {
    !!preventDefault && e.preventDefault();
    !!action && action(e);    
  }
</script>

<style lang="scss">
  .button {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 0.25rem 0.75rem;
    margin-right: 0.5rem;
    background: rgba(219, 211, 216, 0.3);
    border: none;
    border-radius: 4px;
    box-shadow: rgba(50, 50, 93, 0.15) 0px 2px 5px -1px, rgba(0, 0, 0, 0.2) 0px 1px 3px -1px;
    cursor: pointer;
    font-size: 1.3rem;
    &:not(:disabled) {
      &:hover {
        background: rgba(219, 211, 216, 0.5);
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      }
    }
    &:hover {
      .button-text {
        text-shadow: 1px 1px 0px rgba(255,255,255,0.75);
      }
    }
    &:disabled {
      opacity: 0.6;
      filter: grayscale(1);
      cursor: not-allowed;
    }
    &.success {
      background: rgba(188, 217, 121, 0.3);
      &:not(:disabled) {
        &:hover {
          background: rgba(188, 217, 121, 0.5);
        }
      }
      > .button-text {
        color: #395647;
      }
    }
    &.danger {
      background: rgba(239, 108, 139, 0.3);
      &:not(:disabled) {
        &:hover {
          background: rgba(239, 108, 139, 0.5);
        }
      }
      > .button-text {
        color: #E72350;
      }
    }
    &.link {
      background: none;
      box-shadow: none;
      font-weight: bold;
      &:not(:disabled) {
        &:hover {
          background: none;
          box-shadow: none;
          font-weight: bold;
          > .button-text {
            filter: brightness(1.25);
            border-bottom-color: transparent;
          }
        }
      }
      > .button-text {
        border-bottom: 1px solid currentColor;
      }
    }
    &.loading {
      text-align: initial;
      .loading-container {
        position: absolute;
        left: 50%;
        min-width: 100%;
        transform: translateX(-50%);
      }
      :global(.loader) {
        padding: 0.594rem 0;
      }
      .icon,
      .button-text {
        visibility: hidden;
      }
    }
  }
  .button-text {
    font-size: 0.9rem;
    margin-left: 0.5rem;
    color: #05668D;
  }
</style>

<button
  type={type}
  class="button"
  class:success={variant === 'success'}
  class:danger={variant === 'danger'}
  class:loading={variant === 'loading'}
  class:link={style === 'link'}
  disabled={disabled || disabledOverride}
  on:click={handleAction}
>
  {#if icon}
    <span class="icon">{icon}</span>
  {/if}
  <span class="button-text">{label}</span>
  {#if variant === 'loading'}
    <div class="loading-container">
      <Loading/>
    </div>
  {/if}
</button>