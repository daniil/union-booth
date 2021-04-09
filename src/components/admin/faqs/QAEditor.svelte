<script>
  import { fly } from 'svelte/transition';
  import { cubicOut, cubicIn } from 'svelte/easing';
  import MDEditor from 'components/MDEditor.svelte';

  export let visible;

  let animationConfig = { y: 200, duration: 500 };
  let editorValues = {
    question: '',
    answer: ''
  }

  const handleEditorChange = event => {
    editorValues[event.detail.id] = event.detail.value;
  }
</script>

<style>
  .qa-editor {
    position: fixed;
    padding: 2rem;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    box-shadow: rgb(0 0 0 / 15%) 0px 10px 60px;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
  }
</style>

{#if visible}
  <section
    class="qa-editor"
    in:fly="{{...animationConfig, easing: cubicOut}}"
    out:fly="{{...animationConfig, easing: cubicIn}}"
  >
    <h2>QA Editor</h2>
    <MDEditor
      id="question"
      label="Question"
      placeholder="Question details"
      value={editorValues.question}
      on:change={handleEditorChange}
    />
    <MDEditor
      id="answer"
      label="Answer"
      placeholder="Answer details"
      value={editorValues.answer}
      on:change={handleEditorChange}
    />
  </section>
{/if}