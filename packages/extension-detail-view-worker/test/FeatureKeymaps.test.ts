import { expect, test } from '@jest/globals'
import { getDetails, getVirtualDom, isEnabled } from '../src/parts/FeatureKeymaps/FeatureKeymaps.ts'

const extension = {
  keyMap: { modes: { normal: { bindings: { h: { command: 'vim.handleKey' }, i: { command: 'vim.handleKey', mode: 'insert' } } } } },
}

test('only exposes the feature for a contributed keymap', () => {
  expect(isEnabled(extension)).toBe(true)
  for (const value of [null, {}, { keyMap: null }, { keyMap: false }]) expect(isEnabled(value)).toBe(false)
})

test('shows mode, key, extension command, and transition as escaped text', async () => {
  const state = await getDetails(extension)
  const dom = getVirtualDom(state)
  const values = dom.filter((node) => 'text' in node).map((node) => node.text)
  expect(values).toEqual(expect.arrayContaining(['Keymaps', 'Mode', 'Key', 'Command', 'Next Mode', 'normal', 'h', 'vim.handleKey', 'insert']))
})

test('tolerates incomplete contributed modes and bindings', async () => {
  const state = await getDetails({ keyMap: { modes: { insert: { bindings: { h: null, i: {} } }, normal: null } } })
  expect(() => getVirtualDom(state)).not.toThrow()
})
