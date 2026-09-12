import { expect, test } from '@jest/globals'
import { FileSystemWorker } from '@lvce-editor/rpc-registry'
import * as Logger from '../src/parts/Logger/Logger.ts'

const uri = 'memfs:///extension-detail-output.txt'

test('creates the channel on the first error and serializes concurrent logs', async () => {
  let content: string | undefined
  using rpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => {
      if (content === undefined) {
        throw new Error('file not found')
      }
      return content
    },
    'FileSystem.writeFile': async (_uri: string, value: string) => {
      await Promise.resolve()
      content = value
    },
  })
  expect(rpc.invocations).toEqual([])
  const first = new Error('first')
  const second = new Error('second')
  await Promise.all([Logger.error(first), Logger.error(second)])
  expect(content).toBe(`${first}\n${first.stack}\n${second}\n${second.stack}\n`)
  expect(rpc.invocations.map((call) => call.slice(0, 2))).toEqual([
    ['FileSystem.readFile', uri],
    ['FileSystem.writeFile', uri],
    ['FileSystem.readFile', uri],
    ['FileSystem.writeFile', uri],
  ])
})

test('bounds retained output and preserves the newest error', async () => {
  let content = 'x'.repeat(1024 * 1024)
  using _rpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => content,
    'FileSystem.writeFile': (_uri: string, value: string) => {
      content = value
    },
  })
  const error = new Error('latest')
  Object.defineProperty(error, 'stack', { value: '' })
  await Logger.error(error)
  expect(content).toHaveLength(1024 * 1024)
  expect(content.endsWith('Error: latest\n\n')).toBe(true)
})

test('a failed log write does not reject or prevent subsequent logging', async () => {
  let calls = 0
  using _rpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => '',
    'FileSystem.writeFile': () => {
      calls++
      if (calls === 1) {
        throw new Error('unavailable')
      }
    },
  })
  await expect(Logger.error(new Error('first'))).resolves.toBeUndefined()
  await expect(Logger.error(new Error('second'))).resolves.toBeUndefined()
  expect(calls).toBe(2)
})

test('cleared logs are not restored by subsequent errors', async () => {
  let content = 'old error\n'
  using _rpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => content,
    'FileSystem.writeFile': (_uri: string, value: string) => {
      content = value
    },
  })
  await Logger.error(new Error('before clear'))
  content = ''
  const error = new Error('after clear')
  await Logger.error(error)
  expect(content).toBe(`${error}\n${error.stack}\n`)
})

test('includes the error message when the browser stack contains only frames', async () => {
  let content = ''
  using _rpc = FileSystemWorker.registerMockRpc({
    'FileSystem.readFile': () => '',
    'FileSystem.writeFile': (_uri: string, value: string) => {
      content = value
    },
  })
  const error = new Error('Failed to load Changelog content')
  Object.defineProperty(error, 'stack', { value: 'loadChangelogContent@https://example.com/worker.js:42:1' })
  await Logger.error(error)
  expect(content).toContain('Error: Failed to load Changelog content')
  expect(content).toContain('loadChangelogContent@https://example.com/worker.js:42:1')
})
