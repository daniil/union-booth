<script context="module">
  export async function preload(_, session) {
    if (!session.user || !session.user.isVerified) {
      return this.redirect(302, '');
    }
  }
</script>

<script>
  import Nav from 'components/admin/Nav.svelte';

  export let segment;
</script>

<style lang="scss">
  .admin-container {
    padding: 0 1rem;
    @media (min-width: 48rem) {
      padding: 0;
    }
  }
  h1 {
    margin-bottom: 2rem;
    font-size: 1.5rem;
    @media (min-width: 48rem) {
      font-size: 2rem;
    }
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
  <h1>Admin</h1>

  <div class="container">
    <aside class="nav-container">
      <Nav {segment}/>
    </aside>
    <section class="admin-section">
      <slot></slot>
    </section>
  </div>
</div>
