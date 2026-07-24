import { expect, test } from '@jest/globals'
import { ClipBoardWorker } from '@lvce-editor/rpc-registry'
import { copyExtensionInfo } from '../src/parts/CopyExtensionInfo/CopyExtensionInfo.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'

test('copies the formatted extension information', async () => {
  using mockRpc = ClipBoardWorker.registerMockRpc({
    'ClipBoard.writeText'() {},
  })
  const state = {
    ...createDefaultState(),
    description: 'A useful extension',
    extension: {
      publisher: 'test-publisher',
    },
    extensionId: 'test.extension',
    extensionVersion: '1.2.3',
    name: 'Test Extension',
  }
  const result = await copyExtensionInfo(state)
  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([
    [
      'ClipBoard.writeText',
      ['Name: Test Extension', 'Id: test.extension', 'Description: A useful extension', 'Version: 1.2.3', 'Publisher: test-publisher'].join('\n'),
    ],
  ])
})
