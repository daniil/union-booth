<script>
  export let segment;
</script>

<style>
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

<nav>
  <ul class="nav-list">
    <li>
      <a rel="prefetch" aria-current="{segment === 'programs' ? 'page' : undefined}" href="/admin/programs">Programs</a>
    </li>
    <li>
      <a rel="prefetch" aria-current="{segment === 'cohorts' ? 'page' : undefined}" href="/admin/cohorts">Cohorts</a>
    </li>
    <li>
      <a rel="prefetch" aria-current="{segment === 'topics' ? 'page' : undefined}" href="/admin/topics">Topics</a>
    </li>
    <li>
      <a rel="prefetch" aria-current="{segment === 'active-cohort' ? 'page' : undefined}" href="/admin/active-cohort">Active Cohort</a>
    </li>
  </ul>
</nav>