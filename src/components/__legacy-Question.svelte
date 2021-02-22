<script>
  import { get } from '../utils/request';
  import { parseMD } from '../utils/markdown';
  import { formatDate, formatTime } from '../utils/time';
  import QuestionAnswers from './QuestionAnswers.svelte';
  import QuestionStatus from './QuestionStatus.svelte';

  export let topicId;
  export let details;
  export let interactive;

  $: content = parseMD(details.question);
  $: date = formatDate(details.dateCreated);
  $: time = formatTime(details.dateCreated);
  $: isBeingAnswered = !!details.beingAnsweredBy.length;
  $: isAnswered = !!details.answeredBy.length;

  const handleQuestionStatus = async () => {
    const res = await get(`topics/question/status/${topicId}/${details.id}.json`);

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
    background-color: rgba(212, 224, 155, 0.15);
    border-color: rgb(212, 224, 155);
  }

  .is-answered {
    background-color: rgba(212, 224, 155, 0.3);
    border-color: rgb(212, 224, 155);
    border-top-width: 3px;
  }
  time {
    display: flex;
    justify-content: space-between;
  }
</style>

<article
  class="question"
  class:is-being-answered={interactive && isBeingAnswered}
  class:is-answered={interactive && isAnswered}>
  <h3>{@html content}</h3>
  <time>
    <span>{date}</span>
    <span>{time}</span>
  </time>
  {#if interactive}
    <QuestionAnswers
      {topicId}
      questionId={details.id}
      questionDetails={details}
      on:answering={handleQuestionStatus}
      on:answered={handleQuestionStatus}
    />
  {/if}
  {#if interactive && (isBeingAnswered || isAnswered)}
    <QuestionStatus {details}/>
  {/if}
</article>
