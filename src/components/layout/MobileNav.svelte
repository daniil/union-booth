<script>
  import HamburgerIcon from 'components/icons/HamburgerIcon.svelte';
  import MobileNavItems from 'components/layout/MobileNavItems.svelte';

  export let segment;
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
</style>

<div class="mobile-nav-container">
  <button class="mobile-nav-btn">
    <HamburgerIcon color="#05668D" label="Site Navigation"/>
  </button>
  <MobileNavItems {segment}/>
</div>
