import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as GetVirtualDomChildCount from '../src/parts/GetVirtualDomChildCount/GetVirtualDomChildCount.ts'

test('empty array', () => {
  expect(GetVirtualDomChildCount.getVirtualDomChildCount([])).toBe(0)
})

test('single element without children', () => {
  const dom = [
    {
      type: VirtualDomElements.Div,
      childCount: 0,
    },
  ]
  expect(GetVirtualDomChildCount.getVirtualDomChildCount(dom)).toBe(1)
})

test('element with one child', () => {
  const dom = [
    {
      type: VirtualDomElements.Div,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Span,
      childCount: 0,
    },
  ]
  expect(GetVirtualDomChildCount.getVirtualDomChildCount(dom)).toBe(1)
})

test('element with two children', () => {
  const dom = [
    {
      type: VirtualDomElements.Div,
      childCount: 2,
    },
    {
      type: VirtualDomElements.Span,
      childCount: 0,
    },
    {
      type: VirtualDomElements.Span,
      childCount: 0,
    },
  ]
  expect(GetVirtualDomChildCount.getVirtualDomChildCount(dom)).toBe(1)
})

test('nested elements', () => {
  const dom = [
    {
      type: VirtualDomElements.Div,
      childCount: 2,
    },
    {
      type: VirtualDomElements.Div,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Span,
      childCount: 0,
    },
    {
      type: VirtualDomElements.Span,
      childCount: 0,
    },
  ]
  expect(GetVirtualDomChildCount.getVirtualDomChildCount(dom)).toBe(1)
})
