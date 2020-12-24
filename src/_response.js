export function err(res, status, message) {
  res.writeHead(status, {
    'Content-Type': 'application/json'
  });
  let json = JSON.stringify({ error: message });
  return res.end(json);
}

export function success(res, data) {
  res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(data));
}