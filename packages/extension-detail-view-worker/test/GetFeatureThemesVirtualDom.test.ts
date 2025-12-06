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
      childCount: 2,
      className: ClassNames.FeatureContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      type: VirtualDomElements.H1,
    },
    text(ExtensionDetailStrings.theme()),
    {
      childCount: 0,
      className: ClassNames.DefaultMarkdown,
      type: VirtualDomElements.Div,
    },
  ]
  expect(result).toEqual(expected)
})

test('getFeatureThemesVirtualDom with single node themesDom', () => {
  const themesDom: readonly VirtualDomNode[] = [
    {
      childCount: 1,
      type: VirtualDomElements.P,
    },
    text('Theme content'),
  ]
  const result: readonly VirtualDomNode[] = GetFeatureThemesVirtualDom.getFeatureThemesVirtualDom(themesDom)
  const expected: readonly VirtualDomNode[] = [
    {
      childCount: 2,
      className: ClassNames.FeatureContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      type: VirtualDomElements.H1,
    },
    text(ExtensionDetailStrings.theme()),
    {
      childCount: 1,
      className: ClassNames.DefaultMarkdown,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      type: VirtualDomElements.P,
    },
    text('Theme content'),
  ]
  expect(result).toEqual(expected)
})

test('getFeatureThemesVirtualDom with multiple nodes themesDom', () => {
  const themesDom: readonly VirtualDomNode[] = [
    {
      childCount: 1,
      type: VirtualDomElements.P,
    },
    text('First theme'),
    {
      childCount: 1,
      type: VirtualDomElements.P,
    },
    text('Second theme'),
  ]
  const result: readonly VirtualDomNode[] = GetFeatureThemesVirtualDom.getFeatureThemesVirtualDom(themesDom)
  const expected: readonly VirtualDomNode[] = [
    {
      childCount: 2,
      className: ClassNames.FeatureContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      type: VirtualDomElements.H1,
    },
    text(ExtensionDetailStrings.theme()),
    {
      childCount: 2,
      className: ClassNames.DefaultMarkdown,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      type: VirtualDomElements.P,
    },
    text('First theme'),
    {
      childCount: 1,
      type: VirtualDomElements.P,
    },
    text('Second theme'),
  ]
  expect(result).toEqual(expected)
})

test('getFeatureThemesVirtualDom with nested nodes themesDom', () => {
  const themesDom: readonly VirtualDomNode[] = [
    {
      childCount: 2,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      type: VirtualDomElements.P,
    },
    text('Nested content'),
  ]
  const result: readonly VirtualDomNode[] = GetFeatureThemesVirtualDom.getFeatureThemesVirtualDom(themesDom)
  const expected: readonly VirtualDomNode[] = [
    {
      childCount: 2,
      className: ClassNames.FeatureContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      type: VirtualDomElements.H1,
    },
    text(ExtensionDetailStrings.theme()),
    {
      childCount: 1,
      className: ClassNames.DefaultMarkdown,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      type: VirtualDomElements.P,
    },
    text('Nested content'),
  ]
  expect(result).toEqual(expected)
})
