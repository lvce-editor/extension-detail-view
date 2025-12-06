import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../src/parts/VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetAdditionalDetailsEntryVirtualDom from '../src/parts/GetAdditionalDetailsEntryVirtualDom/GetAdditionalDetailsEntryVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('additional details entry virtual dom with items', () => {
  const heading = 'Categories'
  const items = ['Programming Languages', 'Snippets']
  const renderer = (items: readonly string[]): readonly VirtualDomNode[] => {
    return [
      {
        childCount: 1,
        className: 'AdditionalDetailsEntryValue',
        type: VirtualDomElements.Div,
      },
      text(items.join(', ')),
    ]
  }
  expect(GetAdditionalDetailsEntryVirtualDom.getAdditionalDetailsEntryVirtualDom(heading, items, renderer)).toEqual([
    {
      childCount: 2,
      className: ClassNames.AdditionalDetailsEntry,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.AdditionalDetailsTitle,
      type: VirtualDomElements.Div,
    },
    text('Categories'),
    {
      childCount: 1,
      className: 'AdditionalDetailsEntryValue',
      type: VirtualDomElements.Div,
    },
    text('Programming Languages, Snippets'),
  ])
})
