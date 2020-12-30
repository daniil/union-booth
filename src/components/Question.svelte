<script>
  import marked from 'marked';
  import DOMPurify from 'dompurify';
  import { get } from '../utils/request';
  import { formatDate, formatTime } from '../utils/time';
  import QuestionAnswers from './QuestionAnswers.svelte';

  export let discourseId = $$props['discourse-id'];
  export let details;
  export let interactive;

  $: content = DOMPurify.sanitize(marked(details.question));
  $: date = formatDate(details.dateCreated);
  $: time = formatTime(details.dateCreated);
  $: isBeingAnswered = !!details.beingAnsweredBy.length;

  const handleAnswering = async () => {
    const res = await get(`discourse/question/answering/${discourseId}/${details.id}.json`);

    if (!res.error) {
      details = res.data;
    } else {
      console.log('ERROR: ', res.error);
    }
  }
</script>

<style>
  .question {
    position: relative;
    padding: 1rem;
    border: 1px solid #91B7C7;
    border-radius: 4px;
    margin-bottom: 1rem;
  }
  .is-being-answered {
    background-color: rgba(212, 224, 155, 0.25);
    border-color: rgb(212, 224, 155);
  }
  time {
    display: flex;
    justify-content: space-between;
  }
  .answered-by {
    position: absolute;
    top: -2rem;
    right: -1rem;
    font-size: 2.5rem;
  }
</style>

<article class="question" class:is-being-answered={isBeingAnswered}>
  <h3>{@html content}</h3>
  <time>
    <span>{date}</span>
    <span>{time}</span>
  </time>
  {#if interactive}
    <QuestionAnswers
      discourse-id={discourseId}
      question-id={details.id}
      questionDetails={details}
      on:answering={handleAnswering}
    />
  {/if}
  {#if isBeingAnswered}
    <div
      class="answered-by"
      title={details.beingAnsweredBy.map(user => user)}>
      💭
    </div>
  {/if}
</article>
