import { NextResponse } from 'next/server'

async function forward(request: Request, params: { path?: string[] }) {
  const remoteBase = process.env.REMOTE_API_URL || 'https://nyscjosnorth.onrender.com/api'
  const path = (params.path || []).join('/')
  const target = `${remoteBase}/${path}`

  const init: RequestInit = {
    method: request.method,
    headers: {},
    // body set below for non-GET
  }

  // forward some headers (esp auth)
  const incomingHeaders = new Headers(request.headers)
  const outHeaders: Record<string, string> = {}
  for (const [k, v] of incomingHeaders) {
    // skip host to avoid confusion
    if (k.toLowerCase() === 'host') continue
    outHeaders[k] = v
  }

  init.headers = outHeaders

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    try {
      const body = await request.text()
      init.body = body
      // If content-type wasn't forwarded, ensure JSON by default
      if (!init.headers['content-type']) {
        init.headers['content-type'] = 'application/json'
      }
    } catch (e) {
      // ignore body parse errors
    }
  }

  const res = await fetch(target, init)

  // Build response, copying status and relevant headers
  const responseHeaders = new Headers()
  // Copy CORS headers and others except hop-by-hop
  for (const [k, v] of res.headers) {
    if (['transfer-encoding', 'connection', 'keep-alive', 'proxy-authenticate', 'proxy-authorization', 'te', 'trailers', 'upgrade'].includes(k)) continue
    responseHeaders.set(k, v)
  }

  // Ensure browser can access this proxied response
  responseHeaders.set('Access-Control-Allow-Origin', '*')

  const body = await res.arrayBuffer()

  return new NextResponse(Buffer.from(body), {
    status: res.status,
    headers: responseHeaders,
  })
}

export async function GET(request: Request, { params }: { params: { path?: string[] } }) {
  return forward(request, params)
}

export async function POST(request: Request, { params }: { params: { path?: string[] } }) {
  return forward(request, params)
}

export async function PUT(request: Request, { params }: { params: { path?: string[] } }) {
  return forward(request, params)
}

export async function PATCH(request: Request, { params }: { params: { path?: string[] } }) {
  return forward(request, params)
}

export async function DELETE(request: Request, { params }: { params: { path?: string[] } }) {
  return forward(request, params)
}

export async function OPTIONS(request: Request, { params }: { params: { path?: string[] } }) {
  // respond to preflight from browser
  const headers = new Headers()
  headers.set('Access-Control-Allow-Origin', '*')
  headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')
  headers.set('Access-Control-Allow-Headers', request.headers.get('access-control-request-headers') || '*')
  return new NextResponse(null, { status: 204, headers })
}
