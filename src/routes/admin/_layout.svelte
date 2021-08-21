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

<style>
  h1 {
    margin-bottom: 2rem;
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

<h1>Admin</h1>

<div class="container">
  <aside class="nav-container">
    <Nav {segment}/>
  </aside>
  <section class="admin-section">
    <slot></slot>
  </section>
</div>