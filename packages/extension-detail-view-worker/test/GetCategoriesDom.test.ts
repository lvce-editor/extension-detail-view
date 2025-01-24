import { expect, test } from '@jest/globals'
import type { Category } from '../src/parts/Category/Category.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetCategoriesDom from '../src/parts/GetCategoriesDom/GetCategoriesDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('categories dom with categories', () => {
  const categories: readonly Category[] = [
    {
      id: 'programming-languages',
      label: 'Programming Languages',
    },
    {
      id: 'snippets',
      label: 'Snippets',
    },
  ]
  expect(GetCategoriesDom.getCategoriesDom(categories)).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Categories,
      childCount: categories.length,
      onClick: 'handleCategoriesClick',
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Category,
      childCount: 1,
      name: 'programming-languages',
    },
    text('Programming Languages'),
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Category,
      childCount: 1,
      name: 'snippets',
    },
    text('Snippets'),
  ])
})

test('categories dom with empty categories', () => {
  const categories: readonly Category[] = []
  expect(GetCategoriesDom.getCategoriesDom(categories)).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Categories,
      childCount: 0,
      onClick: 'handleCategoriesClick',
    },
  ])
})
