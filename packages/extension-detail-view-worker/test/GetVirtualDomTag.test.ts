import { expect, test } from '@jest/globals'
import * as GetVirtualDomTag from '../src/parts/GetVirtualDomTag/GetVirtualDomTag.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'

test('h1', () => {
  expect(GetVirtualDomTag.getVirtualDomTag('h1')).toBe(VirtualDomElements.H1)
})

test('h2', () => {
  expect(GetVirtualDomTag.getVirtualDomTag('h2')).toBe(VirtualDomElements.H2)
})

test('h3', () => {
  expect(GetVirtualDomTag.getVirtualDomTag('h3')).toBe(VirtualDomElements.H3)
})

test('div', () => {
  expect(GetVirtualDomTag.getVirtualDomTag('div')).toBe(VirtualDomElements.Div)
})

test('article', () => {
  expect(GetVirtualDomTag.getVirtualDomTag('article')).toBe(VirtualDomElements.Article)
})

test('img', () => {
  expect(GetVirtualDomTag.getVirtualDomTag('img')).toBe(VirtualDomElements.Img)
})

test('span', () => {
  expect(GetVirtualDomTag.getVirtualDomTag('span')).toBe(VirtualDomElements.Span)
})

test('unknown tag defaults to div', () => {
  expect(GetVirtualDomTag.getVirtualDomTag('unknown')).toBe(VirtualDomElements.Div)
})
