import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleReadmeClick from '../src/parts/HandleReadmeClick/HandleReadmeClick.ts'

test('handleReadmeClick returns state without calling openUrl when href is empty', async () => {
  const mockRpc = RendererWorker.registerMockRpc({})

  const state: ExtensionDetailState = {
    ...createDefaultState(),
  }

  const result = await HandleReadmeClick.handleReadmeClick(state, 'A', '')

  expect(mockRpc.invocations).toEqual([])
  expect(result).toBe(state)
})

test('handleReadmeClick returns state without calling openUrl when href is not external', async () => {
  const mockRpc = RendererWorker.registerMockRpc({})

  const state: ExtensionDetailState = {
    ...createDefaultState(),
  }

  const result1 = await HandleReadmeClick.handleReadmeClick(state, 'A', '/relative/path')
  const result2 = await HandleReadmeClick.handleReadmeClick(state, 'IMG', '../other/path')
  const result3 = await HandleReadmeClick.handleReadmeClick(state, 'A', 'mailto:test@example.com')
  const result4 = await HandleReadmeClick.handleReadmeClick(state, 'A', '#anchor')

  expect(mockRpc.invocations).toEqual([])
  expect(result1).toBe(state)
  expect(result2).toBe(state)
  expect(result3).toBe(state)
  expect(result4).toBe(state)
})

test('handleReadmeClick calls openUrl with http:// links and returns state', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Open.openUrl': () => {
      /**/
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
  }
  const href = 'http://example.com'

  const result = await HandleReadmeClick.handleReadmeClick(state, 'A', href)

  expect(mockRpc.invocations).toEqual([['Open.openUrl', href]])
  expect(result).toBe(state)
})

test('handleReadmeClick calls openUrl with https:// links and returns state', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Open.openUrl': () => {
      /**/
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
  }
  const href = 'https://github.com/example/repo'

  const result = await HandleReadmeClick.handleReadmeClick(state, 'A', href)

  expect(mockRpc.invocations).toEqual([['Open.openUrl', href]])
  expect(result).toBe(state)
})

test('handleReadmeClick works with different nodeName values', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Open.openUrl': () => {
      /**/
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
  }
  const href = 'https://example.com'

  await HandleReadmeClick.handleReadmeClick(state, 'A', href)
  await HandleReadmeClick.handleReadmeClick(state, 'IMG', href)
  await HandleReadmeClick.handleReadmeClick(state, 'BUTTON', href)

  expect(mockRpc.invocations).toEqual([
    ['Open.openUrl', href],
    ['Open.openUrl', href],
    ['Open.openUrl', href],
  ])
})

test('handleReadmeClick handles http:// and https:// prefixes correctly', async () => {
  const mockRpc = RendererWorker.registerMockRpc({
    'Open.openUrl': () => {
      /**/
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
  }

  await HandleReadmeClick.handleReadmeClick(state, 'A', 'http://example.com/page')
  await HandleReadmeClick.handleReadmeClick(state, 'A', 'https://example.com/page?query=1')

  expect(mockRpc.invocations).toEqual([
    ['Open.openUrl', 'http://example.com/page'],
    ['Open.openUrl', 'https://example.com/page?query=1'],
  ])
})
