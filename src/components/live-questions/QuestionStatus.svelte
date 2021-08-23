<script>
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  export let beingAnsweredBy;
  export let answeredBy;

  let tooltipVisible = false;

  $: isBeingAnswered = !!beingAnsweredBy.length;
  $: isAnswered = !!answeredBy.length;

  const handleMouseOver = e => {
    tooltipVisible = e.type === 'mouseover';
  }
</script>

<style lang="scss">
  .answered-by {
    position: absolute;
    top: -1.5rem;
    right: -0.5rem;
    font-size: 2rem;
    transform: translate3d(0, 0, 0);
    @media (min-width: 48rem) {
      top: -2rem;
      right: -1rem;
      font-size: 2.5rem;
    }
  }
  .user-list {
    position: absolute;
    right: 2rem;
    top: 3.5rem;
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0px 3px 10px 0px rgba(0,0,0,0.15);
    border: 1px solid #DBD3D8;
    border-radius: 4px;
    font-size: 0.8rem;
  }
  .title {
    margin-top: 0;
    font-size: 0.7rem;
    font-weight: 700;
    color: #554348;
    white-space: nowrap;
  }
  .user {
    margin: 0 0 0.5rem;
    white-space: nowrap;
    &:last-child {
      margin: 0;
    }
  }
  .answering {
    color: #B7990D;
  }
  .answered {
    color: #395647;
  }
</style>

<div
  class="answered-by"
  on:mouseover={handleMouseOver}
  on:mouseout={handleMouseOver}>
  {#if isBeingAnswered}💭{/if}
  {#if isAnswered}✅{/if}
  {#if tooltipVisible}
    <div class="user-list" transition:fly="{{ duration: 300, y: 5, opacity: 0, easing: quintOut }}">
      {#if isAnswered}
        <p class="title answered">Answered by:</p>
        {#each answeredBy as answerInProgress}
          <p class="user">{answerInProgress.user.firstName} {answerInProgress.user.lastName}</p>
        {/each}
      {/if}
      {#if isBeingAnswered}
        <p class="title answering">Answering:</p>
        {#each beingAnsweredBy as answerInProgress}
          <p class="user">{answerInProgress.user.firstName} {answerInProgress.user.lastName}</p>
        {/each}
      {/if}
    </div>
  {/if}
</div>