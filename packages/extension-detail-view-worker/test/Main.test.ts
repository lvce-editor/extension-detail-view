import { expect, jest, test } from '@jest/globals'

jest.unstable_mockModule('../src/parts/Listen/Listen.ts', () => ({
  listen: jest.fn(),
}))

const Listen = await import('../src/parts/Listen/Listen.ts')
const Main = await import('../src/parts/Main/Main.ts')

test('main', () => {
  expect(typeof Main.main).toBe('function')
})

test('main calls listen', async () => {
  await Main.main()
  // @ts-ignore
  expect(Listen.listen).toHaveBeenCalledTimes(1)
})

test('main handles errors', async () => {
  // @ts-ignore
  Listen.listen.mockRejectedValue(new Error('test error'))
  await expect(Main.main()).rejects.toThrow('test error')
})

test('main can only be called once', async () => {
  await Main.main()
  await expect(Main.main()).rejects.toThrow('already started')
})
