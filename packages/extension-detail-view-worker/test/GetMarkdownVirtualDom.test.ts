import { expect, test } from '@jest/globals'
import * as GetMarkdownVirtualDom from '../src/parts/GetMarkdownVirtualDom/GetMarkdownVirtualDom.ts'
import * as MarkdownWorker from '../src/parts/MarkdownWorker/MarkdownWorker.ts'

const mockDom = [{ children: ['Hello'], tag: 'div' }]

test('getMarkdownVirtualDom - valid markdown', async () => {
  const mockRpc = MarkdownWorker.registerMockRpc({
    'Markdown.getVirtualDom': () => {
      return mockDom
    },
  })
  const result = await GetMarkdownVirtualDom.getMarkdownVirtualDom('# Hello')
  expect(result).toEqual(mockDom)
  expect(mockRpc.invocations).toEqual([['Markdown.getVirtualDom', '# Hello']])
})

test('getMarkdownVirtualDom - empty string', async () => {
  const mockRpc = MarkdownWorker.registerMockRpc({
    'Markdown.getVirtualDom': () => {
      return []
    },
  })
  const result = await GetMarkdownVirtualDom.getMarkdownVirtualDom('')
  expect(result).toEqual([])
  expect(mockRpc.invocations).toEqual([['Markdown.getVirtualDom', '']])
})

test('getMarkdownVirtualDom - error propagation', async () => {
  const mockRpc = MarkdownWorker.registerMockRpc({
    'Markdown.getVirtualDom': () => {
      throw new Error('fail')
    },
  })
  await expect(GetMarkdownVirtualDom.getMarkdownVirtualDom('bad')).rejects.toThrow('fail')
  expect(mockRpc.invocations).toEqual([['Markdown.getVirtualDom', 'bad']])
})
