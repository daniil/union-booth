<script context="module">
  import AddNewDiscourse from './AddNewDiscourse.svelte';
  import DiscourseTopics from './DiscourseTopics.svelte';

  export async function preload(_page, session) {
    if (!session.user) {
      return this.redirect(302, '');
    }
  }
</script>

<style>
  section {
    margin-bottom: 2rem;
  }
</style>

<h1>Admin Section</h1>

<section>
  <h2>Add New Discourse</h2>
  <AddNewDiscourse/>
</section>

<section>
  <h2>Manage Existing Topics</h2>
  <DiscourseTopics/>
</section>
