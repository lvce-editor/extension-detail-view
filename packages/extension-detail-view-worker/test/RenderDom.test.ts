import { expect, test } from '@jest/globals'
import { ViewletCommand } from '@lvce-editor/constants'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { renderDom } from '../src/parts/RenderDom/RenderDom.ts'

test('renders an empty initial DOM', () => {
  const oldState = createDefaultState()
  const newState = {
    ...createDefaultState(),
    initial: true,
    uid: 42,
  }

  expect(renderDom(oldState, newState)).toEqual([ViewletCommand.SetDom2, 42, []])
})
