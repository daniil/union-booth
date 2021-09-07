<script>
  export let variant;
</script>

<style lang="scss">
  .question {
    position: relative;
    padding: 1rem;
    margin-bottom: 6rem;
    background-color: #FFFDF7;
    border: 1px solid #E3DDE0;
    border-radius: 4px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
    @media (min-width: 48rem) {
      margin-bottom: 3rem;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
    &.subtle {
      margin-bottom: 3rem;
      filter: grayscale(0.75);
      opacity: 0.75;
    }
    &.completed {
      background-color: #F8FAEF;
      border-color: #DCE3DD;
    }
  }
</style>

<div
  class="question"
  class:subtle={variant === 'subtle'}
  class:completed={variant === 'completed'}
>
  <slot></slot>
</div>