import { expect, test } from '@jest/globals'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as GetRenderer from '../src/parts/GetRenderer/GetRenderer.ts'
import * as RenderDom from '../src/parts/RenderDom/RenderDom.ts'
import * as RenderFocus from '../src/parts/RenderFocus/RenderFocus.ts'

test('getRenderer - RenderItems', () => {
  const renderer = GetRenderer.getRenderer(DiffType.RenderItems)
  expect(renderer).toBe(RenderDom.renderDom)
})

test('getRenderer - RenderFocus', () => {
  const renderer = GetRenderer.getRenderer(DiffType.RenderFocus)
  expect(renderer).toBe(RenderFocus.renderFocus)
})

test('getRenderer - unknown type throws', () => {
  expect(() => GetRenderer.getRenderer(999)).toThrow('unknown renderer')
})
