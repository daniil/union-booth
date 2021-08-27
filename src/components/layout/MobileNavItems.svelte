<script>
  import AuthContent from 'components/auth/AuthContent.svelte';

  export let segment;
</script>

<style lang="scss">
  .mobile-nav-items {
    background-color: #fff;
    box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
    border-radius: 4px;
  }
  a {
    position: relative;
		text-decoration: none;
		padding: 0.75rem 1.5rem;
		display: block;
    &[aria-current],
    &:hover {
			background-color: #F6F4F5;
		}
    &:not(:last-child) {
      &::after {
        position: absolute;
        content: '';
        width: 75%;
        height: 1px;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        background-color: #EDE9EB;
      }
    }
	}
</style>

<nav class="mobile-nav-items">
  <a rel="prefetch" aria-current="{segment === 'topics' ? 'page' : undefined}" href="/topics">
    All Topics
  </a>
  <AuthContent role="manager">
    <a rel="prefetch" aria-current="{segment === 'admin' ? 'page' : undefined}" href="/admin">Admin</a>
  </AuthContent>
</nav>