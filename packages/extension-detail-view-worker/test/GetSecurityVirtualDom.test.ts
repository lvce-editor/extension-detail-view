import { expect, test } from '@jest/globals'
import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getSecurityVirtualDom } from '../src/parts/GetSecurityVirtualDom/GetSecurityVirtualDom.ts'

test('renders an accessible security definition list', () => {
  const result = getSecurityVirtualDom({ browser: 'worker.js', isolated: true })

  expect(result[0]).toMatchObject({ className: expect.stringContaining(ClassNames.Security), role: AriaRoles.Panel, type: VirtualDomElements.Div })
  expect(result).toContainEqual(expect.objectContaining({ childCount: 6, className: ClassNames.SecurityDefinitionList, type: VirtualDomElements.Dl }))
  expect(result.filter((node) => node.type === VirtualDomElements.Dt)).toHaveLength(3)
  expect(result.filter((node) => node.type === VirtualDomElements.Dd)).toHaveLength(3)
  expect(result).toContainEqual(
    expect.objectContaining({ className: `${ClassNames.SecurityDefinitionListKey} NetworkRequests`, type: VirtualDomElements.Dt }),
  )
  expect(result).not.toContainEqual(expect.objectContaining({ type: VirtualDomElements.P }))
  expect(result).not.toContainEqual(expect.objectContaining({ type: VirtualDomElements.Table }))
})
