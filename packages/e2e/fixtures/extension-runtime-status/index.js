globalThis.postMessage('ready')

const initializationEvent = await new Promise((resolve) => {
  globalThis.addEventListener('message', resolve, { once: true })
})

const { id, method, params } = initializationEvent.data
if (method !== 'initialize' || params[0] !== 'message-port') {
  throw new Error('Unexpected extension host initialization message')
}

globalThis.postMessage({ id, jsonrpc: '2.0', result: null })

const port = params[1]
port.addEventListener('message', (event) => {
  const { id, method } = event.data
  if (method !== 'ExtensionApi.executeCommand' && method !== 'ExtensionApi.ping') {
    return
  }
  port.postMessage({ id, jsonrpc: '2.0', result: true })
})
port.start()
