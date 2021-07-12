<script context="module">
  export async function preload(_, session) {
    if (session.user?.role === 'manager') {
      return this.redirect(301, '/admin/cohorts');
    }
    if (session.user?.role === 'admin') {
      return this.redirect(301, '/admin/programs');
    }
    return this.redirect(301, '/');
  }
</script>
