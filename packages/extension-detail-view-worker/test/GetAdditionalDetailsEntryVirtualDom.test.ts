import { expect, test } from '@jest/globals'
import type { VirtualDomNode } from '../src/parts/VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetAdditionalDetailsEntryVirtualDom from '../src/parts/GetAdditionalDetailsEntryVirtualDom/GetAdditionalDetailsEntryVirtualDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('additional details entry virtual dom with items', () => {
  const heading = 'Categories'
  const items = ['Programming Languages', 'Snippets']
  const renderer = (items: readonly string[]): readonly VirtualDomNode[] => {
    return [
      {
        type: VirtualDomElements.Div,
        className: 'AdditionalDetailsEntryValue',
        childCount: 1,
      },
      text(items.join(', ')),
    ]
  }
  expect(GetAdditionalDetailsEntryVirtualDom.getAdditionalDetailsEntryVirtualDom(heading, items, renderer)).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.AdditionalDetailsEntry,
      childCount: 2,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.AdditionalDetailsTitle,
      childCount: 1,
    },
    text('Categories'),
    {
      type: VirtualDomElements.Div,
      className: 'AdditionalDetailsEntryValue',
      childCount: 1,
    },
    text('Programming Languages, Snippets'),
  ])
})
