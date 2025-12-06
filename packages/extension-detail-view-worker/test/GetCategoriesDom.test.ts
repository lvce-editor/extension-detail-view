import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Category } from '../src/parts/Category/Category.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetCategoriesDom from '../src/parts/GetCategoriesDom/GetCategoriesDom.ts'
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
      childCount: categories.length,
      className: ClassNames.Categories,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.Category,
      name: 'programming-languages',
      onClick: DomEventListenerFunctions.HandleClickCategory,
      type: VirtualDomElements.Button,
    },
    text('Programming Languages'),
    {
      childCount: 1,
      className: ClassNames.Category,
      name: 'snippets',
      onClick: DomEventListenerFunctions.HandleClickCategory,
      type: VirtualDomElements.Button,
    },
    text('Snippets'),
  ])
})

test('categories dom with empty categories', () => {
  const categories: readonly Category[] = []
  expect(GetCategoriesDom.getCategoriesDom(categories)).toEqual([
    {
      childCount: 0,
      className: ClassNames.Categories,
      type: VirtualDomElements.Div,
    },
  ])
})
