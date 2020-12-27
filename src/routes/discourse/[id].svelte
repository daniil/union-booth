<script context="module">
  import Question from '../../components/Question.svelte';

  export async function preload(page, session) {
    if (!session.user) {
      return this.redirect(302, '');
    }

    const resDiscourse = await this.fetch(`/discourse/${page.params.id}.json`);
    const discourse = await resDiscourse.json();
    const resQuestions = await this.fetch(`/discourse/questions/${page.params.id}.json`);
    const questions = await resQuestions.json();

    return {
      discourse: discourse.data,
      questions: questions.data
    };
  }
</script>

<script>
  export let discourse;
  export let questions = [];
</script>

<h1>{discourse.topic}</h1>
{#each questions as question (question.id)}
  <Question details={question}/>
{/each}