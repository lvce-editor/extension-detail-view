import { expect, test } from '@jest/globals'
import * as GetMarkdownVirtualDom from '../src/parts/GetMarkdownVirtualDom/GetMarkdownVirtualDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test.skip('empty string', () => {
  expect(GetMarkdownVirtualDom.getMarkdownVirtualDom('')).toEqual([
    {
      childCount: 0,
      className: 'Markdown',
      onContextMenu: 'handleReadmeContextMenu',
      role: 'document',
      type: 4,
    },
  ])
})

test.skip('plain text', () => {
  expect(GetMarkdownVirtualDom.getMarkdownVirtualDom('Hello World')).toEqual([
    {
      childCount: 1,
      className: 'Markdown',
      onContextMenu: 'handleReadmeContextMenu',
      role: 'document',
      type: 4,
    },
    text('Hello World'),
  ])
})

test.skip('heading', () => {
  expect(GetMarkdownVirtualDom.getMarkdownVirtualDom('<h1>Hello World</h1>')).toEqual([
    {
      childCount: 1,
      className: 'Markdown',
      onContextMenu: 'handleReadmeContextMenu',
      role: 'document',
      type: 4,
    },
    {
      type: VirtualDomElements.H1,
      childCount: 1,
    },
    text('Hello World'),
  ])
})

test.skip('nested elements', () => {
  expect(GetMarkdownVirtualDom.getMarkdownVirtualDom('<div><p>Hello World</p></div>')).toEqual([
    {
      childCount: 1,
      className: 'Markdown',
      onContextMenu: 'handleReadmeContextMenu',
      role: 'document',
      type: 4,
    },
    {
      type: VirtualDomElements.Div,
      childCount: 1,
    },
    {
      type: VirtualDomElements.P,
      childCount: 1,
    },
    text('Hello World'),
  ])
})

test.skip('throws error for non-string input', () => {
  // @ts-expect-error
  expect(() => GetMarkdownVirtualDom.getMarkdownVirtualDom(123)).toThrow()
})
