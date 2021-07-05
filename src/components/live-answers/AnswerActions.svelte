<script>
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import MeatballIcon from 'components/icons/MeatballIcon.svelte';
  import AnswerActionsNav from 'components/live-answers/AnswerActionsNav.svelte';
  import elementClickOff from 'utils/elementClickOff';

  export let answerId;
  export let isOwner;

  let navVisible = false;

  const handleActionDropdown = () => {
    navVisible = !navVisible;
  }

  const handleActionComplete = () => {
    navVisible = false;
  }

  const handleClickOff = e => {
    if (navVisible) {
      elementClickOff(e, 'actions-container', answerId, () => {
        navVisible = false;
      });
    }
  }
</script>

<style lang="scss">
  .actions-container {
    position: relative;
  }
  .trigger-action {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 1rem 0;
    margin-top: -1rem;
    &:hover {
      filter: brightness(1.25);
    }
  }
  .answer-actions-nav-wrapper {
    position: absolute;
    top: 75%;
    right: 0;
  }
</style>

<svelte:window on:click={handleClickOff}/>

<div class="actions-container" data-id={answerId}>
  <button class="trigger-action" on:click={handleActionDropdown}>
    <MeatballIcon color="#05668D" label="Actions"/>
  </button>
  {#if navVisible}
    <div class="answer-actions-nav-wrapper" transition:fly="{{ duration: 300, y: 5, opacity: 0, easing: quintOut }}">
      <AnswerActionsNav
        {answerId}
        {isOwner}
        on:edit
        on:action-complete={handleActionComplete}
      />
    </div>
  {/if}
</div>