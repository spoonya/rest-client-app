import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { url, method, headers, body } = await req.json();

  const res = await fetch(url, {
    method,
    headers,
    body: method !== 'GET' ? JSON.stringify(body) : undefined,
  });

  const responseBody = await res.text();

  return new NextResponse(responseBody, {
    status: res.status,
    headers: {
      'Content-Type': res.headers.get('content-type') || 'text/plain',
    },
  });
}
