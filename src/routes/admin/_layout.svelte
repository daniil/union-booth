<svelte:head>
	<title>Union Booth :: Admin</title>
</svelte:head>

<script context="module">
  export async function preload(_, session) {
    if (!session.user) {
      return this.redirect(302, '');
    }
  }
</script>

<script>
  export let segment;
</script>

<style>
  .container {
    display: flex;
  }
  .nav-container {
    margin-right: 3rem;
  }
  .admin-section {
    flex-grow: 1;
  }
  .nav-list {
    margin: 0;
    padding-left: 0;
    list-style-type: none;
  }
  a {
    display: block;
    padding: 0.5rem;
  }
  [aria-current] {
    border-left: 2px solid #F19C79;
    background-color: rgba(241, 156, 121, 0.25);
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
</style>

<h1>Admin</h1>

<div class="container">
  <aside class="nav-container">
    <nav>
      <ul class="nav-list">
        <li>
          <a aria-current="{segment === 'programs' ? 'page' : undefined}" href="/admin/programs">Programs</a>
        </li>
        <li>
          <a aria-current="{segment === 'cohorts' ? 'page' : undefined}" href="/admin/cohorts">Cohorts</a>
        </li>
        <li>
          <a aria-current="{segment === 'topics' ? 'page' : undefined}" href="/admin/topics">Topics</a>
        </li>
      </ul>
    </nav>
  </aside>
  <section class="admin-section">
    <slot></slot>
  </section>
</div>