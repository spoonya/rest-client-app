const response = await fetch('/api/proxy', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    method: options.method,
    url: options.url,
    headers: options.headers,
    body: options.body,
  }),
});
