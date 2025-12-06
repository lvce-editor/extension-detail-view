import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { MoreInfoEntry } from '../src/parts/MoreInfoEntry/MoreInfoEntry.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetMoreInfoEntryVirtualDom from '../src/parts/GetMoreInfoEntryVirtualDom/GetMoreInfoEntryVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('more info entry virtual dom', () => {
  const entry: MoreInfoEntry = {
    key: 'License',
    value: 'MIT',
  }
  expect(GetMoreInfoEntryVirtualDom.getMoreInfoEntryVirtualDom(entry)).toEqual([
    {
      childCount: 2,
      className: ClassNames.MoreInfoEntry,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.MoreInfoEntryKey,
      type: VirtualDomElements.Dt,
    },
    text('License'),
    {
      childCount: 1,
      className: ClassNames.MoreInfoEntryValue,
      type: VirtualDomElements.Dd,
    },
    text('MIT'),
  ])
})
