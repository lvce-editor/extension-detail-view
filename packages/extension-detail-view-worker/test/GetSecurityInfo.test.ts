import { expect, test } from '@jest/globals'
import type { SecurityEntry } from '../src/parts/SecurityEntry/SecurityEntry.ts'
import { getSecurityInfo } from '../src/parts/GetSecurityInfo/GetSecurityInfo.ts'

const getEntry = (extension: any, id: string): SecurityEntry => {
  const entry = getSecurityInfo(extension).find((item) => item.id === id)
  if (!entry) {
    throw new Error(`Security entry not found: ${id}`)
  }
  return entry
}

test('reports a declarative extension without executable capabilities', () => {
  const entries = getSecurityInfo({})

  expect(entries).toHaveLength(9)
  expect(getEntry({}, 'NodeJsCode').access).toBe('No')
  expect(getEntry({}, 'BrowserCode').access).toBe('No')
  expect(getEntry({}, 'ExecutionIsolation').access).toBe('Not applicable')
  expect(getEntry({}, 'ExternalConnections').access).toBe('None declared')
  expect(getEntry({}, 'WorkspaceFiles').access).toBe('Not available')
  expect(getEntry({}, 'LocalProcesses').access).toBe('Not available')
  expect(getEntry({}, 'AutomaticActivation').access).toBe('No')
  expect(getEntry({}, 'Webviews').access).toBe('0')
  expect(getEntry({}, 'DynamicCodeEvaluation').access).toBe('Blocked')
})

test('reports unrestricted Node.js capabilities', () => {
  const extension = { activation: ['*'], main: 'index.js' }

  expect(getEntry(extension, 'NodeJsCode')).toMatchObject({ access: 'Yes', details: 'Runs index.js with Node.js APIs.' })
  expect(getEntry(extension, 'ExternalConnections').access).toBe('Unrestricted')
  expect(getEntry(extension, 'WorkspaceFiles').access).toBe('Read and write')
  expect(getEntry(extension, 'LocalProcesses').access).toBe('Allowed')
  expect(getEntry(extension, 'AutomaticActivation').access).toBe('Yes')
  expect(getEntry(extension, 'DynamicCodeEvaluation').access).toBe('Allowed')
})

test('reports a shared browser extension', () => {
  const extension = { browser: 'worker.js', isolated: false }

  expect(getEntry(extension, 'BrowserCode')).toMatchObject({ access: 'Yes', details: 'Runs worker.js in a browser worker.' })
  expect(getEntry(extension, 'ExecutionIsolation').access).toBe('Shared extension host')
  expect(getEntry(extension, 'ExternalConnections').access).toBe('Unrestricted')
  expect(getEntry(extension, 'WorkspaceFiles').access).toBe('Read and write')
})

test('reports restricted external services from all isolated content policies', () => {
  const extension = {
    browser: 'worker.js',
    contentSecurityPolicy: ["default-src 'none'", "connect-src 'self' https://api.example.com ftp://ignored.example", 42],
    isolated: true,
    rpc: [{ contentSecurityPolicy: ['connect-src wss://socket.example.com', "script-src 'self' 'unsafe-eval'"] }, {}],
    views: [{ iframe: { csp: "default-src 'none'; connect-src https://iframe.example.com; script-src 'self'" } }, { iframe: { csp: 42 } }, {}],
    webViews: [{ contentSecurityPolicy: ['connect-src https://webview.example.com'] }, {}],
  }

  expect(getEntry(extension, 'ExecutionIsolation').access).toBe('Isolated worker')
  expect(getEntry(extension, 'ExternalConnections')).toMatchObject({
    access: 'Restricted',
    details: 'https://api.example.com, wss://socket.example.com, https://webview.example.com, https://iframe.example.com',
  })
  expect(getEntry(extension, 'Webviews').access).toBe('4')
  expect(getEntry(extension, 'DynamicCodeEvaluation').access).toBe('Allowed')
})

test('reports wildcard network access from a manifest policy', () => {
  const extension = { browser: 'worker.js', contentSecurityPolicy: ['connect-src *'], isolated: true }

  expect(getEntry(extension, 'ExternalConnections')).toMatchObject({ access: 'Unrestricted', details: 'The manifest declares connect-src *.' })
})

test.each(['onStartup', 'onStartupFinished'])('reports %s as automatic activation', (event) => {
  expect(getEntry({ activation: [event] }, 'AutomaticActivation').access).toBe('Yes')
})

test('ignores invalid manifest collection shapes and non-startup activation events', () => {
  const extension = {
    activation: ['onCommand:test', null],
    browser: '',
    contentSecurityPolicy: {},
    main: 42,
    rpc: {},
    views: {},
    webViews: {},
  }

  expect(getEntry(extension, 'AutomaticActivation').access).toBe('No')
  expect(getEntry(extension, 'NodeJsCode').access).toBe('No')
  expect(getEntry(extension, 'BrowserCode').access).toBe('No')
})
