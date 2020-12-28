const makeRequest = async (method, url, data = null, context = null) => {
  try {
    const fetchFn = context ? context.fetch : fetch;
    const res = await fetchFn(url, {
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

export async function get(url, context) {
  return makeRequest('GET', url, null, context);
}

export async function post(url, data, context) {
  return makeRequest('POST', url, data, context);
}

export async function put(url, data, context) {
  return makeRequest('PUT', url, data, context);
}