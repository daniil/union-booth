<script>
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  export let details;

  let tooltipVisible = false;

  $: isBeingAnswered = !!details.beingAnsweredBy.length;
  $: isAnswered = !!details.answeredBy.length;

  const handleMouseOver = e => {
    tooltipVisible = e.type === 'mouseover';
  }
</script>

<style>
  .answered-by {
    position: absolute;
    top: -2rem;
    right: -1rem;
    font-size: 2.5rem;
  }
  .user-list {
    position: absolute;
    right: 2rem;
    top: 3.5rem;
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0px 3px 10px 0px rgba(0,0,0,0.15);
    border: 1px solid #91B7C7;
    border-radius: 4px;
    font-size: 0.8rem;
  }
  .title {
    font-size: 1rem;
    font-weight: 700;
    color: #554348;
  }
  .user {
    margin: 0 0 0.5rem;
  }
  .user:last-child {
    margin: 0;
  }
</style>

<div
  class="answered-by"
  on:mouseover={handleMouseOver}
  on:mouseout={handleMouseOver}>
  {#if isBeingAnswered}💭{/if}
  {#if isAnswered}✅{/if}
  {#if tooltipVisible}
    <div class="user-list" transition:fly="{{duration: 300, y: 5, opacity: 0, easing: quintOut }}">
      {#if isAnswered}
        <h4 class="title">Answered by:</h4>
        {#each details.answeredByEmail as user}
          <p class="user">{user}</p>
        {/each}
      {/if}
      {#if isBeingAnswered}
        <h4 class="title">Answering:</h4>
        {#each details.beingAnsweredByEmail as user}
          <p class="user">{user}</p>
        {/each}
      {/if}
    </div>
  {/if}
</div>