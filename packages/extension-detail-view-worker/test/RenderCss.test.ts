import { expect, test } from '@jest/globals'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderCss } from '../src/parts/RenderCss/RenderCss.ts'

test('renderCss returns correct array with Viewlet.setCss command', () => {
  const oldState: ExtensionDetailState = {
    ...createDefaultState(),
    paddingLeft: 10,
    paddingRight: 20,
    sideBarWidth: 300,
    uid: 1,
  }
  const newState: ExtensionDetailState = {
    ...createDefaultState(),
    paddingLeft: 15,
    paddingRight: 25,
    sideBarWidth: 350,
    uid: 2,
  }
  const result = renderCss(oldState, newState)
  expect(result).toEqual([
    'Viewlet.setCss',
    2,
    ':root {\n  --ExtensionDetailMaxWidth: 1250px;\n  --ExtensionDetailPaddingLeft: 15px;\n  --ExtensionDetailPaddingRight: 25px;\n  --ExtensionDetailSideBarWidth: 350px;\n}',
  ])
})

test('renderCss uses values from newState not oldState', () => {
  const oldState: ExtensionDetailState = {
    ...createDefaultState(),
    paddingLeft: 5,
    paddingRight: 5,
    sideBarWidth: 200,
    uid: 100,
  }
  const newState: ExtensionDetailState = {
    ...createDefaultState(),
    paddingLeft: 20,
    paddingRight: 30,
    sideBarWidth: 400,
    uid: 200,
  }
  const result = renderCss(oldState, newState)
  expect(result[0]).toBe('Viewlet.setCss')
  expect(result[1]).toBe(200)
  const css = result[2] as string
  expect(css).toContain('--ExtensionDetailPaddingLeft: 20px')
  expect(css).toContain('--ExtensionDetailPaddingRight: 30px')
  expect(css).toContain('--ExtensionDetailSideBarWidth: 400px')
  expect(css).toContain('--ExtensionDetailMaxWidth: 1250px')
})

test('renderCss includes ExtensionDetailMaxWidth fixed at 1250', () => {
  const oldState: ExtensionDetailState = createDefaultState()
  const newState: ExtensionDetailState = {
    ...createDefaultState(),
    paddingLeft: 0,
    paddingRight: 0,
    sideBarWidth: 0,
  }
  const result = renderCss(oldState, newState)
  const css = result[2] as string
  expect(css).toContain('--ExtensionDetailMaxWidth: 1250px')
})

test('renderCss handles zero values correctly', () => {
  const oldState: ExtensionDetailState = createDefaultState()
  const newState: ExtensionDetailState = {
    ...createDefaultState(),
    paddingLeft: 0,
    paddingRight: 0,
    sideBarWidth: 0,
    uid: 0,
  }
  const result = renderCss(oldState, newState)
  expect(result[0]).toBe('Viewlet.setCss')
  expect(result[1]).toBe(0)
  const css = result[2] as string
  expect(css).toContain('--ExtensionDetailPaddingLeft: 0px')
  expect(css).toContain('--ExtensionDetailPaddingRight: 0px')
  expect(css).toContain('--ExtensionDetailSideBarWidth: 0px')
})
