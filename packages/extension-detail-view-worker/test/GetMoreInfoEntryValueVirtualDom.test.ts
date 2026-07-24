import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { MoreInfoEntry } from '../src/parts/MoreInfoEntry/MoreInfoEntry.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetMoreInfoEntryValueVirtualDom from '../src/parts/GetMoreInfoEntryValueVirtualDom/GetMoreInfoEntryValueVirtualDom.ts'
import * as MergeClassNames from '../src/parts/MergeClassNames/MergeClassNames.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('string value', () => {
  const entry: MoreInfoEntry = {
    code: undefined,
    key: 'License',
    odd: undefined,
    onClick: undefined,
    title: undefined,
    value: 'MIT',
  }
  expect(GetMoreInfoEntryValueVirtualDom.getMoreInfoEntryValueVirtualDom(entry)).toEqual([
    {
      childCount: 1,
      className: ClassNames.MoreInfoEntryValue,
      type: VirtualDomElements.Dd,
    },
    text('MIT'),
  ])
})

test('get more info entry value virtual dom with title', () => {
  const item: MoreInfoEntry = {
    code: undefined,
    key: 'Size',
    odd: undefined,
    onClick: undefined,
    title: '/test/path',
    value: '2.5MB',
  }
  const result = GetMoreInfoEntryValueVirtualDom.getMoreInfoEntryValueVirtualDom(item)
  expect(result).toEqual([
    {
      childCount: 1,
      className: ClassNames.MoreInfoEntryValue,
      title: '/test/path',
      type: VirtualDomElements.Dd,
    },
    text('2.5MB'),
  ])
})

test('clickable value is focusable', () => {
  const entry: MoreInfoEntry = {
    code: undefined,
    key: 'Size',
    odd: undefined,
    onClick: 7,
    title: '/test/path',
    value: '2.5MB',
  }
  expect(GetMoreInfoEntryValueVirtualDom.getMoreInfoEntryValueVirtualDom(entry)).toEqual([
    {
      childCount: 1,
      className: MergeClassNames.mergeClassNames(ClassNames.MoreInfoEntryValue, ClassNames.Link),
      onClick: 7,
      tabIndex: 0,
      title: '/test/path',
      type: VirtualDomElements.A,
    },
    text('2.5MB'),
  ])
})
