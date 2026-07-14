import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetMarkdownVirtualDom from '../src/parts/GetMarkdownVirtualDom/GetMarkdownVirtualDom.ts'
import * as MarkdownWorker from '../src/parts/MarkdownWorker/MarkdownWorker.ts'

const mockDom = [{ children: ['Hello'], tag: 'div' }]

test('getMarkdownVirtualDom - valid markdown', async () => {
  using mockRpc = MarkdownWorker.registerMockRpc({
    'Markdown.getVirtualDom': () => {
      return mockDom
    },
  })
  const result = await GetMarkdownVirtualDom.getMarkdownVirtualDom('# Hello')
  expect(result).toEqual(mockDom)
  expect(mockRpc.invocations).toEqual([['Markdown.getVirtualDom', '# Hello']])
})

test('getMarkdownVirtualDom - empty string', async () => {
  using mockRpc = MarkdownWorker.registerMockRpc({
    'Markdown.getVirtualDom': () => {
      return []
    },
  })
  const result = await GetMarkdownVirtualDom.getMarkdownVirtualDom('')
  expect(result).toEqual([])
  expect(mockRpc.invocations).toEqual([['Markdown.getVirtualDom', '']])
})

test('getMarkdownVirtualDom - error propagation', async () => {
  using mockRpc = MarkdownWorker.registerMockRpc({
    'Markdown.getVirtualDom': () => {
      throw new Error('fail')
    },
  })
  await expect(GetMarkdownVirtualDom.getMarkdownVirtualDom('bad')).rejects.toThrow('fail')
  expect(mockRpc.invocations).toEqual([['Markdown.getVirtualDom', 'bad']])
})

test('getMarkdownVirtualDom - adds safe image error handler', async () => {
  const imageDom = [
    {
      alt: '',
      childCount: 0,
      src: '/test/image.png',
      type: VirtualDomElements.Img,
    },
  ]
  using mockRpc = MarkdownWorker.registerMockRpc({
    'Markdown.getVirtualDom': () => {
      return imageDom
    },
  })
  const html = '<img src="/test/image.png" alt="">'
  const result = await GetMarkdownVirtualDom.getMarkdownVirtualDom(html)
  expect(result).toEqual([
    {
      alt: '',
      childCount: 0,
      onError: DomEventListenerFunctions.HandleMarkdownImageError,
      src: '/test/image.png',
      type: VirtualDomElements.Img,
    },
  ])
  expect(Object.keys(result[0]).indexOf('onError')).toBeLessThan(Object.keys(result[0]).indexOf('src'))
  expect(mockRpc.invocations).toEqual([['Markdown.getVirtualDom', html]])
})

test('getMarkdownVirtualDom - keeps non-image nodes unchanged', async () => {
  const dom = [
    {
      childCount: 0,
      type: VirtualDomElements.P,
    },
  ]
  using mockRpc = MarkdownWorker.registerMockRpc({
    'Markdown.getVirtualDom': () => {
      return dom
    },
  })
  const html = '<p></p>'
  const result = await GetMarkdownVirtualDom.getMarkdownVirtualDom(html)
  expect(result).toEqual(dom)
  expect(mockRpc.invocations).toEqual([['Markdown.getVirtualDom', html]])
})

test('getMarkdownVirtualDom - does not restore inline onerror attribute', async () => {
  const imageDom = [
    {
      childCount: 0,
      src: '/test/image.png',
      type: VirtualDomElements.Img,
    },
  ]
  using mockRpc = MarkdownWorker.registerMockRpc({
    'Markdown.getVirtualDom': () => {
      return imageDom
    },
  })
  const html = '<img src="/test/image.png" onerror="alert(1)" alt="">'
  const result = await GetMarkdownVirtualDom.getMarkdownVirtualDom(html)
  expect(result[0]).not.toHaveProperty('onerror')
  expect(result[0]).toHaveProperty('onError', DomEventListenerFunctions.HandleMarkdownImageError)
  expect(mockRpc.invocations).toEqual([['Markdown.getVirtualDom', html]])
})
