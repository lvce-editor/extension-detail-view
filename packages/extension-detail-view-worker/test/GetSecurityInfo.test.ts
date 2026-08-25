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

  expect(entries).toEqual([
    { id: 'NetworkRequests', label: 'Network Requests', value: 'No' },
    { id: 'CodeExecution', label: 'Code Execution', value: 'No' },
    { id: 'NodeJsCodeExecution', label: 'NodeJS Code Execution', value: 'No' },
  ])
})

test('reports unrestricted network and NodeJS code execution', () => {
  const extension = { main: 'index.js' }

  expect(getEntry(extension, 'NetworkRequests').value).toBe('Yes')
  expect(getEntry(extension, 'CodeExecution').value).toBe('No')
  expect(getEntry(extension, 'NodeJsCodeExecution').value).toBe('Yes')
})

test('reports unrestricted network and code execution for a shared browser extension', () => {
  const extension = { browser: 'worker.js', isolated: false }

  expect(getEntry(extension, 'NetworkRequests').value).toBe('Yes')
  expect(getEntry(extension, 'CodeExecution').value).toBe('Yes')
  expect(getEntry(extension, 'NodeJsCodeExecution').value).toBe('No')
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

  expect(getEntry(extension, 'NetworkRequests').value).toBe(
    'https://api.example.com, wss://socket.example.com, https://webview.example.com, https://iframe.example.com',
  )
  expect(getEntry(extension, 'CodeExecution').value).toBe('Yes')
  expect(getEntry(extension, 'NodeJsCodeExecution').value).toBe('No')
})

test('reports wildcard network access from a manifest policy', () => {
  const extension = { browser: 'worker.js', contentSecurityPolicy: ['connect-src *'], isolated: true }

  expect(getEntry(extension, 'NetworkRequests').value).toBe('Yes')
})

test('ignores invalid manifest collection shapes and entry points', () => {
  const extension = {
    browser: '',
    contentSecurityPolicy: {},
    main: 42,
    rpc: {},
    views: {},
    webViews: {},
  }

  expect(getEntry(extension, 'NetworkRequests').value).toBe('No')
  expect(getEntry(extension, 'CodeExecution').value).toBe('No')
  expect(getEntry(extension, 'NodeJsCodeExecution').value).toBe('No')
})
