import { expect, jest, test } from '@jest/globals'
import { WhenExpression } from '@lvce-editor/constants'
import { createMockRpc } from '@lvce-editor/rpc'
import * as createDefaultState from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as ExtensionDetailStates from '../src/parts/ExtensionDetailStates/ExtensionDetailStates.ts'
import * as Render2 from '../src/parts/Render2/Render2.ts'
import * as RendererProcess from '../src/parts/RendererProcess/RendererProcess.ts'

test('render2 should return render commands', async () => {
  const oldState = createDefaultState.createDefaultState()
  const newState = createDefaultState.createDefaultState()
  const uid = 1
  const diffResult = [DiffType.RenderItems]

  ExtensionDetailStates.set(uid, oldState, newState)

  const result = await Render2.render2(uid, diffResult)

  expect(Array.isArray(result)).toBe(true)
})

test('render2 queues renderer commands and returns a lightweight commit marker', async () => {
  const queueCommands = jest.fn((_uid: number, _commands: readonly unknown[]) => 17)
  RendererProcess.set(createMockRpc({ commandMap: { 'Viewlet.queueCommands': queueCommands } }))
  const uid = 2
  const oldState = createDefaultState.createDefaultState()
  const newState = { ...oldState, detailsVirtualDom: [...oldState.detailsVirtualDom] }
  ExtensionDetailStates.set(uid, oldState, newState)

  const result = await Render2.render2(uid, [DiffType.RenderItems])

  expect(queueCommands).toHaveBeenCalledWith(uid, expect.any(Array))
  expect(result).toEqual([['Viewlet.commitPending', uid, 17]])
})

test('render2 leaves focus context management with the renderer worker', async () => {
  const queueCommands = jest.fn((_uid: number, _commands: readonly unknown[]) => 23)
  RendererProcess.set(createMockRpc({ commandMap: { 'Viewlet.queueCommands': queueCommands } }))
  const uid = 3
  const oldState = createDefaultState.createDefaultState()
  const newState = { ...oldState, focus: WhenExpression.FocusExtensionDetailTabs, uid }
  ExtensionDetailStates.set(uid, oldState, newState)

  const result = await Render2.render2(uid, [DiffType.RenderFocusContext])

  expect(queueCommands).toHaveBeenCalledWith(uid, [])
  expect(result).toEqual([
    ['Viewlet.setFocusContext', uid, WhenExpression.FocusExtensionDetailTabs],
    ['Viewlet.commitPending', uid, 23],
  ])
})
