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
    type: VirtualDomElements.Div,
    className: ClassNames.FeatureContent,
    childCount: 2,
  })

  expect(virtualDom[1]).toEqual({
    type: VirtualDomElements.H1,
    childCount: 1,
  })

  expect(virtualDom[2]).toEqual(text(ExtensionDetailStrings.settings()))

  expect(virtualDom[3]).toEqual({
    type: VirtualDomElements.Table,
    className: ClassNames.Table,
    childCount: 2,
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
    type: VirtualDomElements.Div,
    className: ClassNames.FeatureContent,
    childCount: 2,
  })

  expect(virtualDom[1]).toEqual({
    type: VirtualDomElements.H1,
    childCount: 1,
  })

  expect(virtualDom[2]).toEqual(text(ExtensionDetailStrings.settings()))

  expect(virtualDom[3]).toEqual({
    type: VirtualDomElements.Table,
    className: ClassNames.Table,
    childCount: 2,
  })

  expect(virtualDom[4]).toEqual({
    type: VirtualDomElements.THead,
    childCount: 1,
  })

  expect(virtualDom[5]).toEqual({
    type: VirtualDomElements.Tr,
    childCount: 2,
  })

  expect(virtualDom[6]).toEqual({
    type: VirtualDomElements.Th,
    className: ClassNames.TableHeading,
    childCount: 1,
  })

  expect(virtualDom[7]).toEqual(text(ExtensionDetailStrings.id()))

  expect(virtualDom[8]).toEqual({
    type: VirtualDomElements.Th,
    className: ClassNames.TableHeading,
    childCount: 1,
  })

  expect(virtualDom[9]).toEqual(text(ExtensionDetailStrings.label()))

  expect(virtualDom[10]).toEqual({
    type: VirtualDomElements.TBody,
    childCount: 1,
  })

  expect(virtualDom.length).toBeGreaterThan(10)
})
