<script>
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import MeatballIcon from 'components/icons/MeatballIcon.svelte';
  import QuestionActionsNav from 'components/live-questions/QuestionActionsNav.svelte';
  import elementClickOff from 'utils/elementClickOff';

  export let questionId;
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
      elementClickOff(e, 'actions-container', questionId, () => {
        navVisible = false;
      });
    }
  }
</script>

<style lang="scss">
  .question-actions:not(:empty) {
    display: flex;
    background-color: white;
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
  }
  .trigger-action {
    display: inline-block;
    border: none;
    padding: 0.75rem 1rem;
    margin: 0;
    text-decoration: none;
    background: transparent;
    cursor: pointer;
    text-align: center;
    &:hover {
      filter: brightness(1.25);
    }
  }
  .question-actions-nav-wrapper {
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translateX(-50%);
  }
</style>

<svelte:window on:click={handleClickOff}/>

<div class="question-actions">
  <button class="trigger-action" on:click={handleActionDropdown}>
    <MeatballIcon color="#05668D" label="Actions"/>
  </button>
</div>
{#if navVisible}
  <div class="question-actions-nav-wrapper" transition:fly="{{ duration: 300, y: 5, opacity: 0, easing: quintOut }}">
    <QuestionActionsNav
      {questionId}
      {isOwner}
      on:edit
      on:action-complete={handleActionComplete}
    />
  </div>
{/if}