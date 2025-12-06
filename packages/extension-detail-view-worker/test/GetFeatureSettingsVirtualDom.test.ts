import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Row } from '../src/parts/Row/Row.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../src/parts/ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetFeatureSettingsVirtualDom from '../src/parts/GetFeatureSettingsVirtualDom/GetFeatureSettingsVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('getFeatureSettingsVirtualDom - returns correct structure with empty rows', () => {
  const rows: readonly Row[] = []
  const virtualDom = GetFeatureSettingsVirtualDom.getFeatureSettingsVirtualDom(rows)

  expect(virtualDom[0]).toEqual({
    childCount: 2,
    className: ClassNames.FeatureContent,
    type: VirtualDomElements.Div,
  })

  expect(virtualDom[1]).toEqual({
    childCount: 1,
    type: VirtualDomElements.H1,
  })

  expect(virtualDom[2]).toEqual(text(ExtensionDetailStrings.settings()))

  expect(virtualDom[3]).toEqual({
    childCount: 2,
    className: ClassNames.Table,
    type: VirtualDomElements.Table,
  })
})

test('getFeatureSettingsVirtualDom - returns correct structure with rows', () => {
  const rows: readonly Row[] = [
    [
      {
        type: 1,
        value: 'test.id',
      },
      {
        type: 1,
        value: 'Test Label',
      },
    ],
  ]
  const virtualDom = GetFeatureSettingsVirtualDom.getFeatureSettingsVirtualDom(rows)

  expect(virtualDom[0]).toEqual({
    childCount: 2,
    className: ClassNames.FeatureContent,
    type: VirtualDomElements.Div,
  })

  expect(virtualDom[1]).toEqual({
    childCount: 1,
    type: VirtualDomElements.H1,
  })

  expect(virtualDom[2]).toEqual(text(ExtensionDetailStrings.settings()))

  expect(virtualDom[3]).toEqual({
    childCount: 2,
    className: ClassNames.Table,
    type: VirtualDomElements.Table,
  })

  expect(virtualDom[4]).toEqual({
    childCount: 1,
    type: VirtualDomElements.THead,
  })

  expect(virtualDom[5]).toEqual({
    childCount: 2,
    type: VirtualDomElements.Tr,
  })

  expect(virtualDom[6]).toEqual({
    childCount: 1,
    className: ClassNames.TableHeading,
    type: VirtualDomElements.Th,
  })

  expect(virtualDom[7]).toEqual(text(ExtensionDetailStrings.id()))

  expect(virtualDom[8]).toEqual({
    childCount: 1,
    className: ClassNames.TableHeading,
    type: VirtualDomElements.Th,
  })

  expect(virtualDom[9]).toEqual(text(ExtensionDetailStrings.label()))

  expect(virtualDom[10]).toEqual({
    childCount: 1,
    type: VirtualDomElements.TBody,
  })

  expect(virtualDom.length).toBeGreaterThan(10)
})
