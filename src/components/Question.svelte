<script>
  import { formatDate, formatTime } from '../utils/time';

  export let details;

  $: date = formatDate(details.dateCreated);
  $: time = formatTime(details.dateCreated);
</script>

<h3>{details.question}</h3>
<time>{date} {time}</time>