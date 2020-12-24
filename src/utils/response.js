export function err(res, status, message) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'X-Error-Code': message
  });
  let json = JSON.stringify({ error: message });
  return res.end(json);
}

export function success(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json'
  });
	res.end(JSON.stringify({ data }));
}