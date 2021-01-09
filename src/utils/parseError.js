export default err => {
  return err.graphQLErrors.map(item => {
    return `\u26A0\uFE0F ${item.message}\n`;
  }).join('');
}