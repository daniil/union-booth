<script>
  export let variant;
</script>

<style>
  .question {
    position: relative;
    padding: 1rem;
    margin-bottom: 2rem;
    background-color: #FFFDF7;
    border: 1px solid #E3DDE0;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
  }
  .question.subtle {
    filter: grayscale(0.75);
    opacity: 0.75;
  }
  .question.completed {
    background-color: #F8FAEF;
    border-color: #DCE3DD;
  }
</style>

<div
  class="question"
  class:subtle={variant === 'subtle'}
  class:completed={variant === 'completed'}
>
  <slot></slot>
</div>