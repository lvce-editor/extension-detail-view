import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'
import * as RenderMarkdown from '../src/parts/RenderMarkdown/RenderMarkdown.ts'

test.skip('renderMarkdown - basic markdown', async () => {
  const invoke = jest.fn<(...args: readonly any[]) => Promise<any>>().mockResolvedValue('<p>Hello World</p>')
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RendererWorker.set(mockRpc)

  const result = await RenderMarkdown.renderMarkdown('# Hello World', {
    locationProtocol: 'test:',
  })
  expect(result).toBe('<p>Hello World</p>')
  expect(invoke).toHaveBeenCalledWith('Markdown.renderMarkdown', '# Hello World', {})
})

test.skip('renderMarkdown - with baseUrl option', async () => {
  const invoke = jest.fn<(...args: readonly any[]) => Promise<any>>().mockResolvedValue('<p>Test with baseUrl</p>')
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RendererWorker.set(mockRpc)

  const result = await RenderMarkdown.renderMarkdown('# Test', { baseUrl: 'https://example.com', locationProtocol: 'test:' })
  expect(result).toBe('<p>Test with baseUrl</p>')
  expect(invoke).toHaveBeenCalledWith('Markdown.renderMarkdown', '# Test', { baseUrl: 'https://example.com' })
})

test.skip('renderMarkdown - empty markdown', async () => {
  const invoke = jest.fn<(...args: readonly any[]) => Promise<any>>().mockResolvedValue('')
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RendererWorker.set(mockRpc)

  const result = await RenderMarkdown.renderMarkdown('', {
    locationProtocol: 'test:',
  })
  expect(result).toBe('')
  expect(invoke).toHaveBeenCalledWith('Markdown.renderMarkdown', '', {})
})

test.skip('renderMarkdown - complex markdown', async () => {
  const invoke = jest
    .fn<(...args: readonly any[]) => Promise<any>>()
    .mockResolvedValue('<h1>Title</h1><p><strong>Bold text</strong> and <em>italic text</em></p>')
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RendererWorker.set(mockRpc)

  const result = await RenderMarkdown.renderMarkdown('# Title\n\n**Bold text** and *italic text*', {
    locationProtocol: 'test:',
  })
  expect(result).toBe('<h1>Title</h1><p><strong>Bold text</strong> and <em>italic text</em></p>')
  expect(invoke).toHaveBeenCalledWith('Markdown.renderMarkdown', '# Title\n\n**Bold text** and *italic text*', {})
})

test.skip('renderMarkdown - without options', async () => {
  const invoke = jest.fn<(...args: readonly any[]) => Promise<any>>().mockResolvedValue('<p>Simple text</p>')
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RendererWorker.set(mockRpc)

  const result = await RenderMarkdown.renderMarkdown('Simple text', {
    locationProtocol: 'test:',
  })
  expect(result).toBe('<p>Simple text</p>')
  expect(invoke).toHaveBeenCalledWith('Markdown.renderMarkdown', 'Simple text', {})
})
