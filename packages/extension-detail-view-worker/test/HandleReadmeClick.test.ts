import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as HandleReadmeClick from '../src/parts/HandleReadmeClick/HandleReadmeClick.ts'

test('handleReadmeClick returns state without calling openUrl when href is empty', async () => {
  using mockRpc = RendererWorker.registerMockRpc({})

  const state: ExtensionDetailState = {
    ...createDefaultState(),
  }

  const result = await HandleReadmeClick.handleReadmeClick(state, 'A', '')

  expect(mockRpc.invocations).toEqual([])
  expect(result).toBe(state)
})

test('handleReadmeClick returns state without calling openUrl when href is not external', async () => {
  using mockRpc = RendererWorker.registerMockRpc({})

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
  using mockRpc = RendererWorker.registerMockRpc({
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
  using mockRpc = RendererWorker.registerMockRpc({
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
  using mockRpc = RendererWorker.registerMockRpc({
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
  using mockRpc = RendererWorker.registerMockRpc({
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

test('handleReadmeClick opens link when linkProtectionEnabled is false', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Open.openUrl': () => {
      /**/
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    linkProtectionEnabled: false,
  }
  const href = 'https://example.com'

  const result = await HandleReadmeClick.handleReadmeClick(state, 'A', href)

  expect(mockRpc.invocations).toEqual([['Open.openUrl', href]])
  expect(result).toBe(state)
})

test('handleReadmeClick calls confirm and opens link when linkProtectionEnabled is true and confirmed', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ConfirmPrompt.prompt': () => {
      return true
    },
    'Open.openUrl': () => {
      /**/
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    linkProtectionEnabled: true,
  }
  const href = 'https://example.com'

  const result = await HandleReadmeClick.handleReadmeClick(state, 'A', href)

  expect(mockRpc.invocations).toEqual([
    ['ConfirmPrompt.prompt', `Do you want to open this external link?\n\n${href}`],
    ['Open.openUrl', href],
  ])
  expect(result).toBe(state)
})

test('handleReadmeClick calls confirm and does not open link when linkProtectionEnabled is true and not confirmed', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ConfirmPrompt.prompt': () => {
      return false
    },
    'Open.openUrl': () => {
      /**/
    },
  })

  const state: ExtensionDetailState = {
    ...createDefaultState(),
    linkProtectionEnabled: true,
  }
  const href = 'https://example.com'

  const result = await HandleReadmeClick.handleReadmeClick(state, 'A', href)

  expect(mockRpc.invocations).toEqual([['ConfirmPrompt.prompt', `Do you want to open this external link?\n\n${href}`]])
  expect(result).toBe(state)
})
