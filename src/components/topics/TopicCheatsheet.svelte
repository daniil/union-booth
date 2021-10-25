<script>
  import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
  import { parseMD } from 'utils/markdown';
  import CollapseButton from 'components/shared/CollapseButton.svelte';

  export let topic;

  let isCollapsed = false;

  const handleCollapse = () => {
    isCollapsed = !isCollapsed;
  }
</script>

<style lang="scss">
  .topic-cheatsheet {
    position: relative;
    margin-bottom: 3rem;
    border-bottom: 2px solid rgba(222, 207, 222, 0.5);
    background-color: rgba(222, 207, 222, 0.15);
    border-radius: 4px;
    padding: 1.25rem;
  }
  h2 {
    margin-bottom: 0;
    line-height: 1.5;
    font-size: 1.25rem;
    color: #5B3345;
    @media (min-width: 48rem) {
      font-size: 1.5rem;
    }
  }
  h3 {
    font-size: 1rem;
    line-height: 1.5;
    @media (min-width: 48rem) {
      font-size: 1.17rem;
    }
  }
  .collapse-container {
    position: absolute;
    display: flex;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 40%);
    z-index: 1;
    background-color: white;
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 10%) 0px 4px 12px;
  }
</style>

<div class="topic-cheatsheet">
  <h2>Key Concepts</h2>
  {#if !isCollapsed}
    <h3 transition:slide|local="{{ duration: 300, easing: cubicOut }}">
      {@html parseMD(topic.cheatsheet)}
    </h3>
  {/if}
  <div class="collapse-container">
    <CollapseButton pointDown={isCollapsed} on:click={handleCollapse}/>
  </div>
</div>