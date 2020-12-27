<script context="module">
  export async function preload(_page, session) {
    if (!session.user) {
      return this.redirect(302, '');
    }
  }
</script>

<h1>Individual Discourse</h1>