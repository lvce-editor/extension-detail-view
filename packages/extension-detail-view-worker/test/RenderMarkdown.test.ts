import { expect, jest, test } from '@jest/globals'
import * as RenderMarkdown from '../src/parts/RenderMarkdown/RenderMarkdown.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

const mockRpc = {
  invoke: jest.fn(),
} as any

test('renderMarkdown - basic markdown', async () => {
  mockRpc.invoke.mockClear()
  mockRpc.invoke.mockResolvedValue('<p>Hello World</p>')
  RendererWorker.set(mockRpc)

  const result = await RenderMarkdown.renderMarkdown('# Hello World')
  expect(result).toBe('<p>Hello World</p>')
  expect(mockRpc.invoke).toHaveBeenCalledWith('Markdown.renderMarkdown', '# Hello World', {})
})

test('renderMarkdown - with baseUrl option', async () => {
  mockRpc.invoke.mockClear()
  mockRpc.invoke.mockResolvedValue('<p>Test with baseUrl</p>')
  RendererWorker.set(mockRpc)

  const result = await RenderMarkdown.renderMarkdown('# Test', { baseUrl: 'https://example.com' })
  expect(result).toBe('<p>Test with baseUrl</p>')
  expect(mockRpc.invoke).toHaveBeenCalledWith('Markdown.renderMarkdown', '# Test', { baseUrl: 'https://example.com' })
})

test('renderMarkdown - empty markdown', async () => {
  mockRpc.invoke.mockClear()
  mockRpc.invoke.mockResolvedValue('')
  RendererWorker.set(mockRpc)

  const result = await RenderMarkdown.renderMarkdown('')
  expect(result).toBe('')
  expect(mockRpc.invoke).toHaveBeenCalledWith('Markdown.renderMarkdown', '', {})
})

test('renderMarkdown - complex markdown', async () => {
  mockRpc.invoke.mockClear()
  mockRpc.invoke.mockResolvedValue('<h1>Title</h1><p><strong>Bold text</strong> and <em>italic text</em></p>')
  RendererWorker.set(mockRpc)

  const result = await RenderMarkdown.renderMarkdown('# Title\n\n**Bold text** and *italic text*')
  expect(result).toBe('<h1>Title</h1><p><strong>Bold text</strong> and <em>italic text</em></p>')
  expect(mockRpc.invoke).toHaveBeenCalledWith('Markdown.renderMarkdown', '# Title\n\n**Bold text** and *italic text*', {})
})

test('renderMarkdown - without options', async () => {
  mockRpc.invoke.mockClear()
  mockRpc.invoke.mockResolvedValue('<p>Simple text</p>')
  RendererWorker.set(mockRpc)

  const result = await RenderMarkdown.renderMarkdown('Simple text')
  expect(result).toBe('<p>Simple text</p>')
  expect(mockRpc.invoke).toHaveBeenCalledWith('Markdown.renderMarkdown', 'Simple text', {})
})
