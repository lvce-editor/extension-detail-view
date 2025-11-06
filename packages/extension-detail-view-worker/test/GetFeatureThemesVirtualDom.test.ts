import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../src/parts/VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../src/parts/ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetFeatureThemesVirtualDom from '../src/parts/GetFeatureThemesVirtualDom/GetFeatureThemesVirtualDom.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('getFeatureThemesVirtualDom with empty themesDom', () => {
  const themesDom: readonly VirtualDomNode[] = []
  const result: readonly VirtualDomNode[] = GetFeatureThemesVirtualDom.getFeatureThemesVirtualDom(themesDom)
  const expected: readonly VirtualDomNode[] = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.FeatureContent,
      childCount: 2,
    },
    {
      type: VirtualDomElements.H1,
      childCount: 1,
    },
    text(ExtensionDetailStrings.theme()),
    {
      type: VirtualDomElements.Div,
      className: ClassNames.DefaultMarkdown,
      childCount: 0,
    },
  ]
  expect(result).toEqual(expected)
})

test('getFeatureThemesVirtualDom with single node themesDom', () => {
  const themesDom: readonly VirtualDomNode[] = [
    {
      type: VirtualDomElements.P,
      childCount: 1,
    },
    text('Theme content'),
  ]
  const result: readonly VirtualDomNode[] = GetFeatureThemesVirtualDom.getFeatureThemesVirtualDom(themesDom)
  const expected: readonly VirtualDomNode[] = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.FeatureContent,
      childCount: 2,
    },
    {
      type: VirtualDomElements.H1,
      childCount: 1,
    },
    text(ExtensionDetailStrings.theme()),
    {
      type: VirtualDomElements.Div,
      className: ClassNames.DefaultMarkdown,
      childCount: 1,
    },
    {
      type: VirtualDomElements.P,
      childCount: 1,
    },
    text('Theme content'),
  ]
  expect(result).toEqual(expected)
})

test('getFeatureThemesVirtualDom with multiple nodes themesDom', () => {
  const themesDom: readonly VirtualDomNode[] = [
    {
      type: VirtualDomElements.P,
      childCount: 1,
    },
    text('First theme'),
    {
      type: VirtualDomElements.P,
      childCount: 1,
    },
    text('Second theme'),
  ]
  const result: readonly VirtualDomNode[] = GetFeatureThemesVirtualDom.getFeatureThemesVirtualDom(themesDom)
  const expected: readonly VirtualDomNode[] = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.FeatureContent,
      childCount: 2,
    },
    {
      type: VirtualDomElements.H1,
      childCount: 1,
    },
    text(ExtensionDetailStrings.theme()),
    {
      type: VirtualDomElements.Div,
      className: ClassNames.DefaultMarkdown,
      childCount: 2,
    },
    {
      type: VirtualDomElements.P,
      childCount: 1,
    },
    text('First theme'),
    {
      type: VirtualDomElements.P,
      childCount: 1,
    },
    text('Second theme'),
  ]
  expect(result).toEqual(expected)
})

test('getFeatureThemesVirtualDom with nested nodes themesDom', () => {
  const themesDom: readonly VirtualDomNode[] = [
    {
      type: VirtualDomElements.Div,
      childCount: 2,
    },
    {
      type: VirtualDomElements.P,
      childCount: 1,
    },
    text('Nested content'),
  ]
  const result: readonly VirtualDomNode[] = GetFeatureThemesVirtualDom.getFeatureThemesVirtualDom(themesDom)
  const expected: readonly VirtualDomNode[] = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.FeatureContent,
      childCount: 2,
    },
    {
      type: VirtualDomElements.H1,
      childCount: 1,
    },
    text(ExtensionDetailStrings.theme()),
    {
      type: VirtualDomElements.Div,
      className: ClassNames.DefaultMarkdown,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Div,
      childCount: 2,
    },
    {
      type: VirtualDomElements.P,
      childCount: 1,
    },
    text('Nested content'),
  ]
  expect(result).toEqual(expected)
})
