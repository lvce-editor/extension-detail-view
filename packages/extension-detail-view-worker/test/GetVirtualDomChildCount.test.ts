import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as GetVirtualDomChildCount from '../src/parts/GetVirtualDomChildCount/GetVirtualDomChildCount.ts'

test('empty array', () => {
  expect(GetVirtualDomChildCount.getVirtualDomChildCount([])).toBe(0)
})

test('single element without children', () => {
  const dom = [
    {
      childCount: 0,
      type: VirtualDomElements.Div,
    },
  ]
  expect(GetVirtualDomChildCount.getVirtualDomChildCount(dom)).toBe(1)
})

test('element with one child', () => {
  const dom = [
    {
      childCount: 1,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      type: VirtualDomElements.Span,
    },
  ]
  expect(GetVirtualDomChildCount.getVirtualDomChildCount(dom)).toBe(1)
})

test('element with two children', () => {
  const dom = [
    {
      childCount: 2,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      type: VirtualDomElements.Span,
    },
    {
      childCount: 0,
      type: VirtualDomElements.Span,
    },
  ]
  expect(GetVirtualDomChildCount.getVirtualDomChildCount(dom)).toBe(1)
})

test('nested elements', () => {
  const dom = [
    {
      childCount: 2,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      type: VirtualDomElements.Span,
    },
    {
      childCount: 0,
      type: VirtualDomElements.Span,
    },
  ]
  expect(GetVirtualDomChildCount.getVirtualDomChildCount(dom)).toBe(1)
})
