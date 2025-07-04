import { expect, test } from '@jest/globals'
import type { MoreInfoEntry } from '../src/parts/MoreInfoEntry/MoreInfoEntry.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetMoreInfoEntryVirtualDom from '../src/parts/GetMoreInfoEntryVirtualDom/GetMoreInfoEntryVirtualDom.ts'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('more info entry virtual dom', () => {
  const entry: MoreInfoEntry = {
    key: 'License',
    value: 'MIT',
  }
  expect(GetMoreInfoEntryVirtualDom.getMoreInfoEntryVirtualDom(entry)).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.MoreInfoEntry,
      childCount: 2,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.MoreInfoEntryKey,
      childCount: 1,
    },
    text('License'),
    {
      type: VirtualDomElements.Div,
      className: ClassNames.MoreInfoEntryValue,
      childCount: 1,
    },
    text('MIT'),
  ])
})
