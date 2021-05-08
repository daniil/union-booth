export default err => {
  if (err.message) {
    return formatMessage(err.message);
  } else {
    return err.graphQLErrors.map(item => {
      return formatMessage(item.message);
    }).join('');
  }
}

const formatMessage = message => {
  return `\u26A0\uFE0F ${message}\n`;
}