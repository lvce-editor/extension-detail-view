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
  expect(Listen.listen).toHaveBeenCalledTimes(1)
})
