<svelte:head>
	<title>Union Booth :: Profile</title>
</svelte:head>

<script context="module">
  export async function preload(_, session) {
    if (!session.user) {
      return this.redirect(302, '');
    }
  }
</script>

<style lang="scss">
  .container {
    display: flex;
    justify-content: center;
  }
  h1 {
    text-align: center;
    font-size: 1.5rem;
    color: rgba(0,0,0,0.7);
  }
</style>

<div class="container">
  <div class="wrapper">
    <h1>Profile</h1>
  </div>
</div>

