import { expect, test, jest } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import { MockRpc } from '@lvce-editor/rpc'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleReadmeContextMenu from '../src/parts/HandleReadmeContextMenu/HandleReadmeContextMenu.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('handleReadmeContextMenu calls ContextMenu.show and returns state unchanged', async () => {
  const mockInvoke = jest.fn((method: string, ...args: readonly any[]) => {
    if (method === 'ContextMenu.show') {
      return undefined
    }
    throw new Error(`unexpected method ${method}`)
  })

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  const state: ExtensionDetailState = {
    ...createDefaultState(),
  }
  const x = 150
  const y = 250
  const nodeName = 'A'
  const href = 'https://example.com'

  const result = await HandleReadmeContextMenu.handleReadmeContextMenu(state, x, y, nodeName, href)

  expect(mockInvoke).toHaveBeenCalledWith('ContextMenu.show', x, y, MenuEntryId.ExtensionDetailReadme)
  expect(result).toBe(state)
})

test('handleReadmeContextMenu passes correct coordinates to ContextMenu.show', async () => {
  const mockInvoke = jest.fn((method: string, ...args: readonly any[]) => {
    if (method === 'ContextMenu.show') {
      return undefined
    }
    throw new Error(`unexpected method ${method}`)
  })

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  const state: ExtensionDetailState = {
    ...createDefaultState(),
  }
  const x = 300
  const y = 400

  await HandleReadmeContextMenu.handleReadmeContextMenu(state, x, y, 'IMG', '/image.png')

  expect(mockInvoke).toHaveBeenCalledTimes(1)
  const callArgs = mockInvoke.mock.calls[0]
  expect(callArgs[0]).toBe('ContextMenu.show')
  expect(callArgs[1]).toBe(x)
  expect(callArgs[2]).toBe(y)
  expect(callArgs[3]).toBe(MenuEntryId.ExtensionDetailReadme)
})

test('handleReadmeContextMenu returns state regardless of nodeName and href', async () => {
  const mockInvoke = jest.fn((method: string, ...args: readonly any[]) => {
    if (method === 'ContextMenu.show') {
      return undefined
    }
    throw new Error(`unexpected method ${method}`)
  })

  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: mockInvoke,
  })
  RendererWorker.set(mockRpc)

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    name: 'Test Extension',
  }

  const result1 = await HandleReadmeContextMenu.handleReadmeContextMenu(state, 100, 200, 'A', 'https://example.com')
  const result2 = await HandleReadmeContextMenu.handleReadmeContextMenu(state, 100, 200, 'IMG', '/image.png')

  expect(result1).toBe(state)
  expect(result2).toBe(state)
  expect(mockInvoke).toHaveBeenCalledTimes(2)
})
