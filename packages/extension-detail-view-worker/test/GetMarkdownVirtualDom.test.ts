import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as GetMarkdownVirtualDom from '../src/parts/GetMarkdownVirtualDom/GetMarkdownVirtualDom.ts'
import * as MarkdownWorker from '../src/parts/MarkdownWorker/MarkdownWorker.ts'

const mockDom = [{ tag: 'div', children: ['Hello'] }]

test('getMarkdownVirtualDom - valid markdown', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, html: string) => {
      if (method === 'Markdown.getVirtualDom') {
        return mockDom
      }
      throw new Error('unexpected method')
    },
  })
  MarkdownWorker.set(mockRpc)
  const result = await GetMarkdownVirtualDom.getMarkdownVirtualDom('# Hello')
  expect(result).toEqual(mockDom)
})

test('getMarkdownVirtualDom - empty string', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string, html: string) => {
      if (method === 'Markdown.getVirtualDom') {
        return []
      }
      throw new Error('unexpected method')
    },
  })
  MarkdownWorker.set(mockRpc)
  const result = await GetMarkdownVirtualDom.getMarkdownVirtualDom('')
  expect(result).toEqual([])
})

test('getMarkdownVirtualDom - error propagation', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: (method: string) => {
      if (method === 'Markdown.getVirtualDom') {
        throw new Error('fail')
      }
      throw new Error('unexpected method')
    },
  })
  MarkdownWorker.set(mockRpc)
  await expect(GetMarkdownVirtualDom.getMarkdownVirtualDom('bad')).rejects.toThrow('fail')
})
