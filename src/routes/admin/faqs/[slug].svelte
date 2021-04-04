<svelte:head>
	<title>Union Booth :: FAQs: {cohortTopic.topic ? cohortTopic.topic.title : 'Loading'}</title>
</svelte:head>

<script context="module">
  export async function preload(page, session) {
    if (!session.user) {
      return this.redirect(302, '');
    }

    return {
      slug: page.params.slug
    };
  }
</script>

<script>
  import { stores } from '@sapper/app';

  export let slug;

  const { session } = stores();

  let cohortTopic = {};
</script>

<style>
  section {
    margin-bottom: 2rem;
  }
  h3 {
    margin-bottom: 1rem;
    color: rgba(85, 67, 72, 0.7);
  }
</style>

<section>
  <h2>Current Topic FAQs</h2>
  <h3>Published Q and A</h3>
  <h3>Cohort Questions</h3>
  <a href="/admin/faqs">&#10092; back</a>
</section>
