import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as RenderMarkdown from '../src/parts/RenderMarkdown/RenderMarkdown.ts'

test.skip('renderMarkdown - basic markdown', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Markdown.renderMarkdown': () => {
      return '<p>Hello World</p>'
    },
  })

  const result = await RenderMarkdown.renderMarkdown('# Hello World', {
    locationProtocol: 'test:',
  })
  expect(result).toBe('<p>Hello World</p>')
  expect(mockRpc.invocations).toEqual([['Markdown.renderMarkdown', '# Hello World', {}]])
})

test.skip('renderMarkdown - with baseUrl option', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Markdown.renderMarkdown': () => {
      return '<p>Test with baseUrl</p>'
    },
  })

  const result = await RenderMarkdown.renderMarkdown('# Test', { baseUrl: 'https://example.com', locationProtocol: 'test:' })
  expect(result).toBe('<p>Test with baseUrl</p>')
  expect(mockRpc.invocations).toEqual([['Markdown.renderMarkdown', '# Test', { baseUrl: 'https://example.com' }]])
})

test.skip('renderMarkdown - empty markdown', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Markdown.renderMarkdown': () => {
      return ''
    },
  })

  const result = await RenderMarkdown.renderMarkdown('', {
    locationProtocol: 'test:',
  })
  expect(result).toBe('')
  expect(mockRpc.invocations).toEqual([['Markdown.renderMarkdown', '', {}]])
})

test.skip('renderMarkdown - complex markdown', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Markdown.renderMarkdown': () => {
      return '<h1>Title</h1><p><strong>Bold text</strong> and <em>italic text</em></p>'
    },
  })

  const result = await RenderMarkdown.renderMarkdown('# Title\n\n**Bold text** and *italic text*', {
    locationProtocol: 'test:',
  })
  expect(result).toBe('<h1>Title</h1><p><strong>Bold text</strong> and <em>italic text</em></p>')
  expect(mockRpc.invocations).toEqual([['Markdown.renderMarkdown', '# Title\n\n**Bold text** and *italic text*', {}]])
})

test.skip('renderMarkdown - without options', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Markdown.renderMarkdown': () => {
      return '<p>Simple text</p>'
    },
  })

  const result = await RenderMarkdown.renderMarkdown('Simple text', {
    locationProtocol: 'test:',
  })
  expect(result).toBe('<p>Simple text</p>')
  expect(mockRpc.invocations).toEqual([['Markdown.renderMarkdown', 'Simple text', {}]])
})
