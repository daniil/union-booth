<script context="module">
  import AddNewDiscourse from './AddNewDiscourse.svelte';

  export async function preload(_page, session) {
    if (!session.user) {
      return this.redirect(302, '');
    }
  }
</script>

<h1>Admin Section</h1>

<h2>Add New Discourse</h2>

<AddNewDiscourse/>