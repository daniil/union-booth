<script context="module">
  export async function preload(_, session) {
    if (!session.user || !session.user.isVerified) {
      return this.redirect(302, '');
    }
  }
</script>

<script>
  import Nav from 'components/admin/Nav.svelte';
  import MobileNavButton from 'components/admin/MobileNavButton.svelte';
  import elementClickOff from 'utils/elementClickOff';

  export let segment;

  let navVisible = false;

  const toggleMobileNav = () => {
    navVisible = !navVisible;
  }

  const handleClickOff = e => {
    if (navVisible) {
      elementClickOff(e, 'mobile-nav-btn', 'mobile-nav-btn', () => {
        navVisible = false;
      });
    }
  }
</script>

<style lang="scss">
  .admin-container {
    padding: 0 1rem;
    @media (min-width: 48rem) {
      padding: 0;
    }
  }
  .heading-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    @media (min-width: 48rem) {
      display: block;
      margin-bottom: 0;
    }
    :global(.icon-container) {
      transform: scale(0.7);
    }
  }
  h1 {
    margin-bottom: 0;
    font-size: 1.5rem;
    @media (min-width: 48rem) {
      margin-bottom: 2rem;
      font-size: 2rem;
    }
  }
  .container {
    display: flex;
  }
  .nav-container {
    position: absolute;
    left: 0;
    top: 3.5rem;
    margin-right: 3rem;
    min-width: 15%;
    background-color: white;
    box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
    z-index: 1;
    transform: translateX(-100%);
    transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1);
    @media (min-width: 48rem) {
      position: static;
      box-shadow: none;
      transform: translateX(0);
    }
    &.visible {
      transform: translateX(0);
    }
  }
  .admin-section {
    flex-grow: 1;
  }
</style>

<svelte:window
  on:click={handleClickOff}
/>

<div class="admin-container">
  <div class="heading-container">
    <h1>Admin</h1>
    <MobileNavButton isOpen={navVisible} on:click={toggleMobileNav}/>
  </div>

  <div class="container">
    <aside class="nav-container" class:visible={navVisible} data-id="mobile-nav">
      <Nav on:click={toggleMobileNav} {segment}/>
    </aside>
    <section class="admin-section">
      <slot></slot>
    </section>
  </div>
</div>
