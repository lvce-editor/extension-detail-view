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
      type: VirtualDomElements.Dt,
      className: ClassNames.MoreInfoEntry,
      childCount: 2,
    },
    {
      type: VirtualDomElements.Dt,
      className: ClassNames.MoreInfoEntryKey,
      childCount: 1,
    },
    text('License'),
    {
      type: VirtualDomElements.Dd,
      className: ClassNames.MoreInfoEntryValue,
      childCount: 1,
    },
    text('MIT'),
  ])
})
