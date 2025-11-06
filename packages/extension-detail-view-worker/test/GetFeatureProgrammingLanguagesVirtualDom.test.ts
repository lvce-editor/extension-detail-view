import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { Row } from '../src/parts/Row/Row.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetFeatureProgrammingLanguagesVirtualDom from '../src/parts/GetFeatureProgrammingLanguagesVirtualDom/GetFeatureProgrammingLanguagesVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('feature programming languages virtual dom', () => {
  const programmingLanguages: readonly Row[] = []
  expect(GetFeatureProgrammingLanguagesVirtualDom.getFeatureProgrammingLanguagesVirtualDom(programmingLanguages)).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.FeatureContent,
      childCount: 2,
    },
    {
      type: VirtualDomElements.H1,
      childCount: 1,
    },
    text('Programming Languages'),
    {
      childCount: 2,
      className: 'Table',
      type: VirtualDomElements.Table,
    },
    {
      childCount: 1,
      type: VirtualDomElements.THead,
    },
    {
      childCount: 5,
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: 'TableHeading',
      type: VirtualDomElements.Th,
    },
    {
      childCount: 0,
      text: 'ID',
      type: VirtualDomElements.Text,
    },

    {
      childCount: 1,
      className: 'TableHeading',
      type: VirtualDomElements.Th,
    },
    {
      childCount: 0,
      text: 'Name',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      className: 'TableHeading',
      type: VirtualDomElements.Th,
    },
    {
      childCount: 0,
      text: 'File Extensions',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      className: 'TableHeading',
      type: VirtualDomElements.Th,
    },
    {
      childCount: 0,
      text: 'Grammar',
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      className: 'TableHeading',
      type: VirtualDomElements.Th,
    },
    {
      childCount: 0,
      text: 'Snippets',
      type: VirtualDomElements.Text,
    },

    {
      childCount: 0,
      type: VirtualDomElements.TBody,
    },
  ])
})
