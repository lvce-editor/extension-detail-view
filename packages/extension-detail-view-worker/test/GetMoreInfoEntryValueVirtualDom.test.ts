import { expect, test } from '@jest/globals'
import type { MoreInfoEntry } from '../src/parts/MoreInfoEntry/MoreInfoEntry.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetMoreInfoEntryValueVirtualDom from '../src/parts/GetMoreInfoEntryValueVirtualDom/GetMoreInfoEntryValueVirtualDom.ts'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('string value', () => {
  const entry: MoreInfoEntry = {
    key: 'License',
    value: 'MIT',
  }
  expect(GetMoreInfoEntryValueVirtualDom.getMoreInfoEntryValueVirtualDom(entry)).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.MoreInfoEntryValue,
      childCount: 1,
    },
    text('MIT'),
  ])
})
