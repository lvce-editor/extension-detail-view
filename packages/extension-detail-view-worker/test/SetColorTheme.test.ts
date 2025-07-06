import { expect, jest, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import * as RendererWorker from '../src/parts/RendererWorker/RendererWorker.ts'
import * as SetColorTheme from '../src/parts/SetColorTheme/SetColorTheme.ts'

test('set color theme', async () => {
  const invoke: any = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RendererWorker.set(mockRpc)

  invoke.mockResolvedValue('theme-id')
  const result = await SetColorTheme.setColorTheme('test-id')
  expect(result).toBe('theme-id')
  expect(invoke).toHaveBeenCalledWith('ColorTheme.setColorTheme', 'test-id')
})

test('handles error during set color theme', async () => {
  const invoke: any = jest.fn()
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke,
  })
  RendererWorker.set(mockRpc)

  const error = new Error('Failed to set color theme')
  invoke.mockRejectedValue(error)
  await expect(SetColorTheme.setColorTheme('test-id')).rejects.toThrow('Failed to set color theme')
})