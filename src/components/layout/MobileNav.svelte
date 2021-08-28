<script>
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import HamburgerIcon from 'components/icons/HamburgerIcon.svelte';
  import MobileNavItems from 'components/layout/MobileNavItems.svelte';
  import elementClickOff from 'utils/elementClickOff';

  export let segment;

  let navVisible = false;

  const toggleNav = () => {
    navVisible = !navVisible;
  }

  const handleClickOff = e => {
    if (navVisible) {
      elementClickOff(e, 'mobile-nav-btn', 'mobile-nav', () => {
        navVisible = false;
      });
    }
  }
</script>

<style lang="scss">
  .mobile-nav-container {
    position: relative;
    white-space: nowrap;
  }
  .mobile-nav-btn {
    padding: 1.27rem 2rem;
    border: none;
    background-color: transparent;
    &:hover {
      filter: brightness(1.25);
    }
  }
  .mobile-nav-items-container {
    position: absolute;
    right: 50%;
    top: 86%;
    transform: translateX(50%);
    z-index: 1;
  }
</style>

<svelte:window
  on:click={handleClickOff}
/>

<div class="mobile-nav-container">
  <button class="mobile-nav-btn" data-id="mobile-nav" on:click={toggleNav}>
    <HamburgerIcon color="#05668D" label="Site Navigation"/>
  </button>
  {#if navVisible}
    <div class="mobile-nav-items-container" transition:fly="{{ duration: 300, y: 5, opacity: 0, easing: quintOut }}">
      <MobileNavItems {segment}/>
    </div>
  {/if}
</div>
