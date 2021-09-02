<script>
  import AuthContent from 'components/auth/AuthContent.svelte';
  import AppVersion from 'components/shared/AppVersion.svelte';

  export let segment;
</script>

<style lang="scss">
  .nav-list {
    margin: 0 0 2rem;
    padding-left: 0;
    list-style-type: none;
  }
  a {
    display: block;
    padding: 1rem 2rem 1rem 1rem;
    text-decoration: none;
    color: #05668D;
    font-weight: 500;
    font-size: 0.9rem;
    white-space: nowrap;
    @media (min-width: 48rem) {
      padding: 0.5rem;
      font-size: 1rem;
    }
    &:not([aria-current]):hover {
      filter: brightness(1.25);
    }
  }
  [aria-current] {
    border-left: 2px solid #DECFDE;
    background-color: rgba(247, 243, 247, 1);
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  .app-version-wrapper {
    margin: 0 1rem 1rem 1rem;
    @media (min-width: 48rem) {
      margin: 0 0 0 0.5rem;
    }
  }
</style>

<nav>
  <ul class="nav-list">
    <AuthContent role="admin">
      <li>
        <a rel="prefetch" aria-current="{segment === 'programs' ? 'page' : undefined}" href="/admin/programs" on:click>Programs</a>
      </li>
    </AuthContent>
    <li>
      <a rel="prefetch" aria-current="{segment === 'cohorts' ? 'page' : undefined}" href="/admin/cohorts" on:click>Cohorts</a>
    </li>
    <li>
      <a rel="prefetch" aria-current="{segment === 'topics' ? 'page' : undefined}" href="/admin/topics" on:click>Topics</a>
    </li>
    <li>
      <a rel="prefetch" aria-current="{segment === 'active-cohort' ? 'page' : undefined}" href="/admin/active-cohort" on:click>Active Cohort</a>
    </li>
    <li>
      <a rel="prefetch" aria-current="{segment === 'faqs' ? 'page' : undefined}" href="/admin/faqs" on:click>FAQs</a>
    </li>
    <li>
      <a rel="prefetch" aria-current="{segment === 'resources' ? 'page' : undefined}" href="/admin/resources" on:click>Resources</a>
    </li>
    <AuthContent role="manager">
      <li>
        <a rel="prefetch" aria-current="{segment === 'users' ? 'page' : undefined}" href="/admin/users" on:click>Users</a>
      </li>
    </AuthContent>
  </ul>
  <div class="app-version-wrapper">
    <AppVersion/>
  </div>
</nav>