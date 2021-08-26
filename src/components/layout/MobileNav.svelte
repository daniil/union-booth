<script>
  import HamburgerIcon from "components/icons/HamburgerIcon.svelte";
</script>

<style lang="scss">
  .mobile-nav-btn {
    padding: 1.27rem 2rem;
    border: none;
    background-color: transparent;
    &:hover {
      filter: brightness(1.25);
    }
  }
</style>

<button class="mobile-nav-btn">
  <HamburgerIcon color="#05668D" label="Site Navigation"/>
</button>