<script>
  import { fly } from 'svelte/transition';
  import { cubicOut, cubicIn } from 'svelte/easing';

  export let visible;

  let animationConfig = { y: 200, duration: 500 };
</script>

<style>
  .qa-editor {
    position: fixed;
    padding: 2rem;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
  }
</style>

{#if visible}
  <section
    class="qa-editor"
    in:fly="{{...animationConfig, easing: cubicOut}}"
    out:fly="{{...animationConfig, easing: cubicIn}}"
  >
    <h2>QA Editor</h2>
  </section>
{/if}