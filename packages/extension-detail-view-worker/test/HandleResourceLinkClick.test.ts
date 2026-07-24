import { expect, test } from '@jest/globals'
import { PlatformType } from '@lvce-editor/constants'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { handleResourceLinkClick } from '../src/parts/HandleResourceLinkClick/HandleResourceLinkClick.ts'

test.each(['', 'README.md'])('ignores an invalid resource link: %p', async (href) => {
  using mockRpc = RendererWorker.registerMockRpc({})
  const state = createDefaultState()

  const result = await handleResourceLinkClick(state, href)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([])
})

test.each(['http://example.com', 'https://example.com'])('opens an external resource link: %p', async (href) => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Open.openUrl': () => {
      /**/
    },
  })
  const state = {
    ...createDefaultState(),
    platform: PlatformType.Web,
  }

  const result = await handleResourceLinkClick(state, href)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['Open.openUrl', href]])
})
