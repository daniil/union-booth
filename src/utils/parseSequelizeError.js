export default err => {
  if (err.errors) {
    return err.errors.map(e => e.message).join('\n');
  } else {
    return err.message;
  }
}