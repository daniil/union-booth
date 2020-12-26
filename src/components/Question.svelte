<script>
  export let details;

  const dateObj = new Date(details.dateCreated);

  $: date = dateObj.toLocaleDateString('en-CA', {
    month: 'short',
    day: 'numeric'
  });

  $: time = dateObj.toLocaleTimeString('en-CA', {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit'
  });
</script>

<h3>{details.question}</h3>
<time>{date} {time}</time>