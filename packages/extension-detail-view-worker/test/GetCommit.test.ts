import { expect, test } from '@jest/globals'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import { getCommit } from '../src/parts/GetCommit/GetCommit.ts'

test('getCommit returns commit when Layout.getCommit succeeds', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.getCommit': () => 'abc123',
  })
  const result = await getCommit()
  expect(result).toBe('abc123')
  expect(mockRpc.invocations).toEqual([['Layout.getCommit']])
})

test('getCommit returns empty string when Layout.getCommit throws error', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'Layout.getCommit': () => {
      throw new Error('Failed to get commit')
    },
  })
  const result = await getCommit()
  expect(result).toBe('')
  expect(mockRpc.invocations).toEqual([['Layout.getCommit']])
})
