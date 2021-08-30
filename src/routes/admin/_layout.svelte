<script context="module">
  export async function preload(_, session) {
    if (!session.user || !session.user.isVerified) {
      return this.redirect(302, '');
    }
  }
</script>

<script>
  import Nav from 'components/admin/Nav.svelte';
  import HamburgerIcon from 'components/icons/HamburgerIcon.svelte';

  export let segment;
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
  .admin-nav-btn {
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
  .admin-nav-btn-label {
    margin-left: 0.25rem;
    font-size: 1rem;
    color: #05668D;
  }
  .container {
    display: flex;
  }
  .nav-container {
    margin-right: 3rem;
    min-width: 15%;
  }
  .admin-section {
    flex-grow: 1;
  }
</style>

<div class="admin-container">
  <div class="heading-container">
    <h1>Admin</h1>
    <button class="admin-nav-btn">
      <HamburgerIcon color="#05668D" label="Admin Navigation"/>
      <span class="admin-nav-btn-label">Menu</span>
    </button>
  </div>

  <div class="container">
    <aside class="nav-container">
      <Nav {segment}/>
    </aside>
    <section class="admin-section">
      <slot></slot>
    </section>
  </div>
</div>
