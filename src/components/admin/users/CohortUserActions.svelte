<script>
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import KebabIcon from 'components/icons/KebabIcon.svelte';
  import CohortUserActionsNav from 'components/admin/users/CohortUserActionsNav.svelte';
  import elementClickOff from 'utils/elementClickOff';

  export let userId;
  
  let navVisible = false;

  const handleActionDropdown = () => {
    navVisible = !navVisible;
  }

  const handleActionComplete = () => {
    navVisible = false;
  }

  const handleClickOff = e => {
    if (navVisible) {
      elementClickOff(e, 'actions-container', userId, () => {
        navVisible = false;
      });
    }
  }
</script>

<style lang="scss">
  .trigger-action {
    background: transparent;
    border: none;
    cursor: pointer;
    &:hover {
      filter: brightness(1.25);
    }
  }
  .user-actions-nav-wrapper {
    position: absolute;
    top: 90%;
    left: 50%;
    transform: translateX(-50%);
  }
</style>

<svelte:window on:click={handleClickOff}/>

<button class="trigger-action" on:click={handleActionDropdown}>
  <KebabIcon color="#05668D"/>
</button>
{#if navVisible}
  <div class="user-actions-nav-wrapper" transition:fly="{{ duration: 300, y: 5, opacity: 0, easing: quintOut }}">
    <CohortUserActionsNav
      on:action-complete={handleActionComplete}
    />
  </div>
{/if}