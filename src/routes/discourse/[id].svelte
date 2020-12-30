<script context="module">
  import { get } from '../../utils/request';
  import Question from '../../components/Question.svelte';

  export async function preload(page, session) {
    if (!session.user) {
      return this.redirect(302, '');
    }

    const resDiscourse = await get(`/discourse/${page.params.id}.json`, this);
    const resQuestions = await get(`/discourse/questions/${page.params.id}.json`, this);

    return {
      discourse: resDiscourse.data,
      questions: resQuestions.data
    };
  }
</script>

<script>
  export let discourse;
  export let questions = [];
</script>

<h1>{discourse.topic}</h1>
{#if questions.length}
  {#each questions as question (question.id)}
    <Question details={question}/>
  {/each}
{:else}
  <p>No questions for this topic yet.</p>
{/if}