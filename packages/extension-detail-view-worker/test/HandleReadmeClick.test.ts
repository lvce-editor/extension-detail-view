import { expect, test, jest } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleReadmeClick from '../src/parts/HandleReadmeClick/HandleReadmeClick.ts'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

test('handleReadmeClick returns state without calling openUrl when href is empty', async () => {
  const mockInvoke = jest.fn((method: string, ...args: readonly any[]) => {
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

  const result = await HandleReadmeClick.handleReadmeClick(state, 'A', '')

  expect(mockInvoke).not.toHaveBeenCalled()
  expect(result).toBe(state)
})

test('handleReadmeClick returns state without calling openUrl when href is not external', async () => {
  const mockInvoke = jest.fn((method: string, ...args: readonly any[]) => {
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

  const result1 = await HandleReadmeClick.handleReadmeClick(state, 'A', '/relative/path')
  const result2 = await HandleReadmeClick.handleReadmeClick(state, 'IMG', '../other/path')
  const result3 = await HandleReadmeClick.handleReadmeClick(state, 'A', 'mailto:test@example.com')
  const result4 = await HandleReadmeClick.handleReadmeClick(state, 'A', '#anchor')

  expect(mockInvoke).not.toHaveBeenCalled()
  expect(result1).toBe(state)
  expect(result2).toBe(state)
  expect(result3).toBe(state)
  expect(result4).toBe(state)
})

test('handleReadmeClick calls openUrl with http:// links and returns state', async () => {
  const mockInvoke = jest.fn((method: string, ...args: readonly any[]) => {
    if (method === 'Open.openUrl') {
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
  const href = 'http://example.com'

  const result = await HandleReadmeClick.handleReadmeClick(state, 'A', href)

  expect(mockInvoke).toHaveBeenCalledWith('Open.openUrl', href)
  expect(result).toBe(state)
})

test('handleReadmeClick calls openUrl with https:// links and returns state', async () => {
  const mockInvoke = jest.fn((method: string, ...args: readonly any[]) => {
    if (method === 'Open.openUrl') {
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
  const href = 'https://github.com/example/repo'

  const result = await HandleReadmeClick.handleReadmeClick(state, 'A', href)

  expect(mockInvoke).toHaveBeenCalledWith('Open.openUrl', href)
  expect(result).toBe(state)
})

test('handleReadmeClick works with different nodeName values', async () => {
  const mockInvoke = jest.fn((method: string, ...args: readonly any[]) => {
    if (method === 'Open.openUrl') {
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
  const href = 'https://example.com'

  await HandleReadmeClick.handleReadmeClick(state, 'A', href)
  await HandleReadmeClick.handleReadmeClick(state, 'IMG', href)
  await HandleReadmeClick.handleReadmeClick(state, 'BUTTON', href)

  expect(mockInvoke).toHaveBeenCalledTimes(3)
  expect(mockInvoke).toHaveBeenNthCalledWith(1, 'Open.openUrl', href)
  expect(mockInvoke).toHaveBeenNthCalledWith(2, 'Open.openUrl', href)
  expect(mockInvoke).toHaveBeenNthCalledWith(3, 'Open.openUrl', href)
})

test('handleReadmeClick handles http:// and https:// prefixes correctly', async () => {
  const mockInvoke = jest.fn((method: string, ...args: readonly any[]) => {
    if (method === 'Open.openUrl') {
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

  await HandleReadmeClick.handleReadmeClick(state, 'A', 'http://example.com/page')
  await HandleReadmeClick.handleReadmeClick(state, 'A', 'https://example.com/page?query=1')

  expect(mockInvoke).toHaveBeenCalledTimes(2)
  expect(mockInvoke).toHaveBeenNthCalledWith(1, 'Open.openUrl', 'http://example.com/page')
  expect(mockInvoke).toHaveBeenNthCalledWith(2, 'Open.openUrl', 'https://example.com/page?query=1')
})
