<script>
  import { formatDate, formatTime } from '../utils/time';

  export let details;

  $: date = formatDate(details.dateCreated);
</script>

<style>
  .wrapper {
    display: flex;
    justify-content: space-between;
  }
</style>

<article class="wrapper">
  <a rel="prefetch" href="/discourse/{details.id}">
    <h2>{details.topic}</h2>
  </a>
  <p>{date}</p>
</article>
