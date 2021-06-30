<script>
  import { fly } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';
  import MeatballIcon from 'components/MeatballIcon.svelte';

  export let answerId;
  export let isOwner;

  let navVisible = false;

  const handleActionDropdown = () => {
    navVisible = !navVisible;
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
  .answer-actions-nav-wrapper {
    position: absolute;
    top: 90%;
    right: 0;
  }
</style>

<button class="trigger-action" on:click={handleActionDropdown}>
  <MeatballIcon color="#05668D" label="Actions"/>
</button>
{#if navVisible}
  <div class="answer-actions-nav-wrapper" transition:fly="{{ duration: 300, y: 5, opacity: 0, easing: quintOut }}">
    Answer Nav
  </div>
{/if}