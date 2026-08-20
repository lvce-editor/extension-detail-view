import { expect, test } from '@jest/globals'
import { AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { getSecurityVirtualDom } from '../src/parts/GetSecurityVirtualDom/GetSecurityVirtualDom.ts'

test('renders an accessible security capability table', () => {
  const result = getSecurityVirtualDom({ browser: 'worker.js', isolated: true })

  expect(result[0]).toMatchObject({ className: expect.stringContaining(ClassNames.Security), role: AriaRoles.Panel, type: VirtualDomElements.Div })
  expect(result).toContainEqual(
    expect.objectContaining({ className: expect.stringContaining(ClassNames.SecurityTable), type: VirtualDomElements.Table }),
  )
  expect(result.filter((node) => node.type === VirtualDomElements.Th)).toHaveLength(3)
  expect(result.filter((node) => node.type === VirtualDomElements.Tr)).toHaveLength(10)
  expect(result).toContainEqual(expect.objectContaining({ className: `${ClassNames.SecurityRow} ExternalConnections`, type: VirtualDomElements.Tr }))
})
