<script>
  import MDEditor from 'components/MDEditor.svelte';

  export let visible;

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
    transform: translateY(100%);
    transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1);
  }
  .visible {
    transform: translateY(0%);
  }
</style>

<section
  class="qa-editor"
  class:visible
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
