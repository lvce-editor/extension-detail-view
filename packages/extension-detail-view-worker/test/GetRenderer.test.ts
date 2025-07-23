import { expect, test } from '@jest/globals'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as GetRenderer from '../src/parts/GetRenderer/GetRenderer.ts'
import * as RenderDom from '../src/parts/RenderDom/RenderDom.ts'
import * as RenderFocus from '../src/parts/RenderFocus/RenderFocus.ts'
import * as RenderScrollTop from '../src/parts/RenderScrollTop/RenderScrollTop.ts'

test('getRenderer - RenderItems', () => {
  const renderer = GetRenderer.getRenderer(DiffType.RenderItems)
  expect(renderer).toBe(RenderDom.renderDom)
})

test('getRenderer - RenderFocus', () => {
  const renderer = GetRenderer.getRenderer(DiffType.RenderFocus)
  expect(renderer).toBe(RenderFocus.renderFocus)
})

test('getRenderer - RenderScrollTop', () => {
  const renderer = GetRenderer.getRenderer(DiffType.RenderScrollTop)
  expect(renderer).toBe(RenderScrollTop.renderScrollTop)
})

test('getRenderer - unknown type throws', () => {
  expect(() => GetRenderer.getRenderer(999)).toThrow('unknown renderer')
})
