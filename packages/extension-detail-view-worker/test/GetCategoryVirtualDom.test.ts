import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Category } from '../src/parts/Category/Category.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetCategoryVirtualDom from '../src/parts/GetCategoryVirtualDom/GetCategoryVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('selected category', () => {
  const category: Category = {
    id: 'programming-languages',
    label: 'Programming Languages',
  }
  expect(GetCategoryVirtualDom.getCategoryVirtualDom(category)).toEqual([
    {
      type: VirtualDomElements.Div,
      className: `${ClassNames.Category}`,
      childCount: 1,
    },
    text('Programming Languages'),
  ])
})
