/*
a utility function to convert an Express request to a Fetch request, we can make use
of it to define the server-side router.
*/
export function createFetchRequest(req) {
  const origin = `${req.protocol}://${req.get('host')}`
  const url = new URL(req.originalUrl || req.url, origin)

  const controller = new AbortController()
  req.on('close', () => controller.abort())

  const headers = new Headers()

  //map the Express requests headers to Fetch headers
  for (const [key, values] of Object.entries(req.headers)) {
    if (!values) continue
    if (Array.isArray(values)) {
      for (const value of values) {
        headers.append(key, value)
      }
    } else {
      headers.set(key, values)
    }
  }

  //build the init object for the Fetch request, which consists of method, headers,and AbortController
  const init = {
    method: req.method,
    headers,
    signal: controller.signal,
  }

  //If our request was not a GET or HEAD request, we also get body
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req.body
  }

  return new Request(url.href, init)
}
