import { expect, test } from '@jest/globals'
import * as GetMarkdownVirtualDom from '../src/parts/GetMarkdownVirtualDom/GetMarkdownVirtualDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('empty string', () => {
  expect(GetMarkdownVirtualDom.getMarkdownVirtualDom('')).toEqual([])
})

test('plain text', () => {
  expect(GetMarkdownVirtualDom.getMarkdownVirtualDom('Hello World')).toEqual([text('Hello World')])
})

test('heading', () => {
  expect(GetMarkdownVirtualDom.getMarkdownVirtualDom('<h1>Hello World</h1>')).toEqual([
    {
      type: VirtualDomElements.H1,
      childCount: 1,
    },
    text('Hello World'),
  ])
})

test('nested elements', () => {
  expect(GetMarkdownVirtualDom.getMarkdownVirtualDom('<div><p>Hello World</p></div>')).toEqual([
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

test('throws error for non-string input', () => {
  // @ts-expect-error
  expect(() => GetMarkdownVirtualDom.getMarkdownVirtualDom(123)).toThrow()
})
