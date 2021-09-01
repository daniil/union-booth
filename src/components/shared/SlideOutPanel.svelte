<script>
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';
  import { quintInOut } from 'svelte/easing';
  import Portal from 'svelte-portal';

  export let title;
  export let visible;

  const dispatch = createEventDispatcher();

  const triggerClose = () => {
    dispatch('close');
  }

  const handleKeydown = e => {
    if (visible && e.keyCode === 27) {
      triggerClose();
    } 
  }

  const handleClickOutside = e => {
    if (visible) {
      triggerClose();
    }
  }
</script>

<style lang="scss">
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,0.5);
    z-index: 4;
  }
  .slide-out-panel {
    position: fixed;
    display: flex;
    justify-content: center;
    padding: 2rem;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    box-shadow: rgb(0 0 0 / 15%) 0px 10px 60px;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
    transform: translateY(100%);
    transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1);
    z-index: 4;
    &.visible {
      transform: translateY(0%);
    }
  }
  .slide-out-panel-container {
    width: 100%;
    max-width: 52em;
  }
  h2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .close {
    padding: 0.25rem 0.75rem;
    border: 1px solid #D4C4C7;
    border-radius: 50%;
    background: none;
    font-size: 1rem;
    color: #9B6A6C;
    cursor: pointer;
    &:hover {
      background-color: #F6F3F4;
      border-color: #B09398;
      color: #B09398;
    }
  }
</style>

<svelte:window
  on:keydown={handleKeydown}
/>

<Portal target=".page-container">
  {#if visible}
    <div
      class="backdrop"
      on:click={handleClickOutside}
      transition:fade={{ duration: 500, easing: quintInOut }}
    ></div>
  {/if}
  <section class="slide-out-panel" class:visible>
    <div class="slide-out-panel-container">
      <h2>
        {title}
        <button class="close" on:click={triggerClose}>X</button>
      </h2>
      <slot></slot>
    </div>
  </section>
</Portal>
