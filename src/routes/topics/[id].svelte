<svelte:head>
	<title>Union Booth :: Topic: {topic ? topic.title : 'Loading'}</title>
</svelte:head>

<script context="module">
  import { get } from '../../utils/request';
  import Question from '../../components/Question.svelte';

  export async function preload(page, session) {
    if (!session.user) {
      return this.redirect(302, '');
    }

    const resTopic = await get(`/topics/${page.params.id}.json`, this);
    const resQuestions = await get(`/topics/questions/${page.params.id}.json`, this);

    return {
      topic: resTopic.data,
      questions: resQuestions.data
    };
  }
</script>

<script>
  export let topic;
  export let questions = [];
</script>

<h1>{topic.title}</h1>
{#if questions.length}
  {#each questions as question (question.id)}
    <Question details={question}/>
  {/each}
{:else}
  <p>No questions for this topic yet.</p>
{/if}