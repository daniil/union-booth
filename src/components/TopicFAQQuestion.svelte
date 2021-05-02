<script>
  import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
  import { parseMD } from 'utils/markdown';
  import { formatDate } from 'utils/time';
  
  export let question;

  let answerVisible;

  const toggleAnswer = () => {
    answerVisible = !answerVisible;
  }
</script>

<style>
  section {
    margin-bottom: 4rem;
    padding: 1rem;
    border-radius: 6px;
    background-color: #fbf9f8;
  }
  .time {
    margin-bottom: 1rem;
    color: rgba(1, 22, 56, 0.5);
    font-size: 0.8rem;
    text-align: right;
  }
  .btn-answer {
    display: flex;
    justify-content: center;
    width: 100%;
    background: none;
    border: none;
    cursor: pointer;
    color: #05668F;
  }
  .btn-answer:hover {
    filter: brightness(1.25);
  }
  .btn-label {
    padding: 0.75rem 0;
    border-bottom: 3px solid #fff;
    font-weight: bold;
  }
  .btn-answer:hover > .btn-label {
    border-bottom-color: rgba(255, 255, 255, 0.5);
  }
</style>

<section class="question">
  <div class="time">{formatDate(question.createdAt, true)}</div>
  <h3>{@html parseMD(question.question)}</h3>
  <button class="btn-answer" on:click={toggleAnswer}>
    <div class="btn-label">
      {#if answerVisible}Hide{:else}View{/if} Answer
    </div>
  </button>
  {#if answerVisible}
    <div class="answer" transition:slide="{{ duration: 300, easing: cubicOut }}">
      {@html parseMD(question.answer)}
    </div>
  {/if}
</section>