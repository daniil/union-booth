<script context="module">
  export async function preload(page) {
    return this.redirect(301, `/topics/${page.params.slug}/cheatsheet`);
  }
</script>
