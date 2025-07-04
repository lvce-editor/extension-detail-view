import { beforeEach, expect, test } from '@jest/globals'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'

beforeEach(() => {})

test('invoke - successfully invokes command', async () => {
  const mockRpc = {
    invoke(): string {
      return 'test result'
    },
  } as any
  RendererWorker.set(mockRpc)
  // @ts-ignore
  const result = await RendererWorker.invoke('test.command', 'arg1', 'arg2')
  expect(result).toBe('test result')
})

test('invoke - handles error from rpc', async () => {
  const mockRpc = {
    async invoke(): Promise<void> {
      throw new Error('test error')
    },
  } as any
  RendererWorker.set(mockRpc)
  // @ts-ignore
  await expect(RendererWorker.invoke('test.command')).rejects.toThrow('test error')
})

test('invoke - handles undefined arguments', async () => {
  const mockRpc = {
    invoke(): string {
      return 'success'
    },
  } as any
  RendererWorker.set(mockRpc)
  // @ts-ignore
  const result = await RendererWorker.invoke('test.command')
  expect(result).toBe('success')
})

test('invoke - handles multiple arguments of different types', async () => {
  let capturedArgs: readonly any[] = []
  const mockRpc = {
    invoke(command: string, ...args: readonly any[]): string {
      capturedArgs = args
      return 'success'
    },
  } as any
  RendererWorker.set(mockRpc)
  const args = [1, 'string', true, { key: 'value' }, [1, 2, 3]]
  // @ts-ignore
  await RendererWorker.invoke('test.command', ...args)
  expect(capturedArgs).toEqual(args)
})
