<script>
  import { fly } from 'svelte/transition';
  import { cubicOut, cubicIn } from 'svelte/easing';

  export let visible;

  let animationConfig = { y: 200, duration: 500 };
</script>

{#if visible}
  <section
    in:fly="{{...animationConfig, easing: cubicOut}}"
    out:fly="{{...animationConfig, easing: cubicIn}}"
  >
    <h2>QA Editor</h2>
  </section>
{/if}