<script>
  import AdminLink from 'components/admin/AdminLink.svelte';

  export let topic;
</script>

<AdminLink
  href="/admin/faqs/{topic.slug}"
  title={topic.title}
/>