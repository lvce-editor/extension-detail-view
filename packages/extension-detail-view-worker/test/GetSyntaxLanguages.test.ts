import { expect, test } from '@jest/globals'
import { ExtensionManagementWorker } from '@lvce-editor/rpc-registry'
import { getSyntaxLanguages } from '../src/parts/GetSyntaxLanguages/GetSyntaxLanguages.ts'

test('returns normalized extension-contributed languages', async () => {
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getLanguages': () => [
      {
        aliases: ['JavaScript', 12],
        extensions: ['.js', null],
        id: 'javascript',
        otherProperty: true,
        tokenize: '/extensions/javascript/tokenize.js',
      },
      null,
      { id: 42 },
      { id: 'plaintext' },
    ],
  })

  await expect(getSyntaxLanguages(1, '/assets')).resolves.toEqual([
    {
      aliases: ['JavaScript'],
      extensions: ['.js'],
      id: 'javascript',
      tokenize: '/extensions/javascript/tokenize.js',
    },
  ])
  expect(mockRpc.invocations).toEqual([['Extensions.getLanguages', 1, '/assets']])
})

test('returns empty languages for invalid response', async () => {
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getLanguages': () => ({}),
  })

  await expect(getSyntaxLanguages(1, '/assets')).resolves.toEqual([])
  expect(mockRpc.invocations).toHaveLength(1)
})

test('returns empty languages when extension management fails', async () => {
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.getLanguages': () => {
      throw new Error('failed to load languages')
    },
  })

  await expect(getSyntaxLanguages(1, '/assets')).resolves.toEqual([])
  expect(mockRpc.invocations).toHaveLength(1)
})
