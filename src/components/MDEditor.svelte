<script>
  import { onMount, createEventDispatcher } from 'svelte';

  export let id;
  export let label;
  export let placeholder;
  export let value;
  export let disabled;

  const dispatch = createEventDispatcher();

  let textareaEl;
  let SimpleMDE;

  $: {
    if (SimpleMDE !== undefined && value !== undefined && value !== SimpleMDE.value()) {
      SimpleMDE.value(value);
    }
  }

  $: {
    if (SimpleMDE !== undefined) {
      SimpleMDE.codemirror.options.readOnly = disabled;
    }
  }

  onMount(async () => {
    const SimpleMDEImport = await import('simplemde');
    SimpleMDE = new SimpleMDEImport.default({
      element: textareaEl,
      placeholder,
      hideIcons: ['heading'],
      showIcons: ['code']
    });
    SimpleMDE.codemirror.on("change", function(){
      dispatch('change', {
        id,
        value: SimpleMDE.value()
      });
    });
  });
</script>

<style>
  .label {
    display: inline-block;
    margin-bottom: 0.5rem;
    color: #3E6990;
    font-size: 1rem;
  }
  .md-editor :global(.CodeMirror),
  .md-editor :global(.CodeMirror-scroll) {
    min-height: 130px;
    max-height: 200px;
  }
  .md-editor.disabled {
    opacity: 0.75;
    pointer-events: none;
  }
</style>

<label class="label" for={id}>{label}</label>
<br />
<div class="md-editor" class:disabled>
  <textarea
    bind:this={textareaEl}
    class="input"
    name={id}
    id={id}></textarea>
</div>
