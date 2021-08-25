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

<style lang="scss">
  .label {
    display: inline-block;
    margin-bottom: 0.5rem;
    color: #3E6990;
    font-size: 1rem;
  }
  .md-editor {
    :global(.CodeMirror),
    :global(.CodeMirror-scroll) {
      min-height: 130px;
      max-height: 200px;
    }
    :global(.editor-toolbar) {
      background-color: #fff;
      overflow: scroll;
      white-space: nowrap;
    }
    :global(.editor-toolbar a:last-child) {
      margin-right: 10px;
    }
    :global(.CodeMirror-wrap pre) {
      font-size: 0.9rem;
      @media (min-width: 48rem) {
        font-size: inherit;
      }
    }
    &.disabled {
      pointer-events: none;
      :global(.editor-toolbar),
      :global(.CodeMirror) {
        background-color: rgba(239, 239, 239, 0.3);
        color: rgb(84, 84, 84);
      }
    }
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
