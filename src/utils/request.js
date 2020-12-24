const makeRequest = async (method, url, data = null) => {
  try {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: data ? JSON.stringify(data) : null
    });
    return await res.json();
  } catch(err) {
    return { error: err };
  }
}

export async function get(url) {
  return makeRequest('GET', url);
}

export async function post(url, data) {
  return makeRequest('POST', url, data);
}