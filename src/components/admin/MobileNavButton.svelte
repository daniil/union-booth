<script>
  import { scale } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import HamburgerIcon from 'components/icons/HamburgerIcon.svelte';

  export let isOpen;

  let animationValues = { duration: 500, opacity: 0, start: 0.25, easing: quintOut };
</script>

<style lang="scss">
  .mobile-nav-btn {
    position: relative;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    @media (min-width: 48rem) {
      display: none;
    }
    &:hover {
      filter: brightness(1.25);
    }
  }
  .close-icon {
    position: absolute;
    left: 0;
    transform: translate(-175%, 1px);
    color: #05668D;
    font-weight: 600;
    font-size: 0.8rem;
  }
  .hamburger-icon {
    position: absolute;
    left: 0;
    transform: translateX(-100%);
  }
  .mobile-nav-btn-label {
    margin-left: 0.25rem;
    font-size: 1rem;
    color: #05668D;
  }
</style>

<button class="mobile-nav-btn" on:click>
  {#if isOpen}
    <span class="close-icon" transition:scale="{animationValues}">X</span>
  {:else}
    <div class="hamburger-icon" transition:scale="{animationValues}">
      <HamburgerIcon color="#05668D" label="Admin Navigation"/>
    </div>
  {/if}
  <span class="mobile-nav-btn-label">Menu</span>
</button>