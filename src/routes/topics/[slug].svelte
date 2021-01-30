<svelte:head>
	<title>Union Booth :: Topic: {topic ? topic.title : 'Loading'}</title>
</svelte:head>

<script context="module">
  import { get } from '../../utils/request';
  import { TOPIC } from 'graphql/queries/topics';

  export async function preload(page, session) {
    if (!session.user) {
      return this.redirect(302, '');
    }

    await session.apolloClient.query({
      query: TOPIC,
      variables: { slug: page.params.slug }
    });

    const resQuestions = await get(`/topics/questions/${page.params.slug}.json`, this);

    return {
      slug: page.params.slug,
      questions: resQuestions.data
    };
  }
</script>

<script>
  import { stores } from '@sapper/app';
  import Question from '../../components/Question.svelte';

  export let slug;
  export let questions = [];

  const { session } = stores();

  let topic = $session.apolloClient.readQuery({
    query: TOPIC,
    variables: { slug }
  }).topic;
</script>

<h1>{topic.title}</h1>
{#if questions.length}
  {#each questions as question (question.id)}
    <Question details={question}/>
  {/each}
{:else}
  <p>No questions for this topic yet.</p>
{/if}