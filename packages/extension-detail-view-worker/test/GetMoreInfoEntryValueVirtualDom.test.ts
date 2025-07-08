import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { MoreInfoEntry } from '../src/parts/MoreInfoEntry/MoreInfoEntry.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetMoreInfoEntryValueVirtualDom from '../src/parts/GetMoreInfoEntryValueVirtualDom/GetMoreInfoEntryValueVirtualDom.ts'
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

test('get more info entry value virtual dom with title', () => {
  const item = {
    key: 'Size',
    value: '2.5MB',
    title: '/test/path',
  }
  const result = GetMoreInfoEntryValueVirtualDom.getMoreInfoEntryValueVirtualDom(item)
  expect(result).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.MoreInfoEntryValue,
      childCount: 1,
      title: '/test/path',
    },
    text('2.5MB'),
  ])
})
