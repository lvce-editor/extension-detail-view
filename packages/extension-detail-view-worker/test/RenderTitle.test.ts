import { expect, test } from '@jest/globals'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderTitle } from '../src/parts/RenderTitle/RenderTitle.ts'

test('returns the loaded extension name', () => {
  const state = {
    ...createDefaultState(),
    name: 'Atom One Dark Theme',
  }

  expect(renderTitle(state)).toBe('Atom One Dark Theme')
})

test('returns an empty title when no extension name is available', () => {
  const state = createDefaultState()

  expect(renderTitle(state)).toBe('')
})
