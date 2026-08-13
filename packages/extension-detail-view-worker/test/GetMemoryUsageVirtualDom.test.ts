import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { getMemoryUsageVirtualDom } from '../src/parts/GetMemoryUsageVirtualDom/GetMemoryUsageVirtualDom.ts'

test.each([0, -1, Number.NaN])('returns no row when memory usage is unavailable: %s', (memoryUsage) => {
  expect(getMemoryUsageVirtualDom(memoryUsage)).toEqual([])
})

test('returns formatted memory usage row', () => {
  expect(getMemoryUsageVirtualDom(1.5 * 1024 ** 2)).toEqual([
    {
      childCount: 1,
      type: VirtualDomElements.Dt,
    },
    {
      childCount: 0,
      text: 'Memory Usage: ',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      type: VirtualDomElements.Dd,
    },
    {
      childCount: 0,
      text: '1.5 MB',
      type: VirtualDomElements.Text,
    },
  ])
})
