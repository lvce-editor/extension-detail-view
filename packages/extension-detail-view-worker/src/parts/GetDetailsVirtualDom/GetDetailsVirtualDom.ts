import type { Category } from '../Category/Category.ts'
import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as GetAdditionalDetailsVirtualDom from '../GetAdditionalDetailsVirtualDom/GetAdditionalDetailsVirtualDom.ts'
import * as GetMarkdownVirtualDom from '../GetMarkdownVirtualDom/GetMarkdownVirtualDom.ts'
import * as GetVirtualDomChildCount from '../GetVirtualDomChildCount/GetVirtualDomChildCount.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getDetailsVirtualDom = (sanitizedReadmeHtml: string): readonly VirtualDomNode[] => {
  const markdownDom = GetMarkdownVirtualDom.getMarkdownVirtualDom(sanitizedReadmeHtml)
  const childCount = GetVirtualDomChildCount.getVirtualDomChildCount(markdownDom)

  const firstHeading = 'Installation'
  const entries: readonly MoreInfoEntry[] = [
    {
      key: 'Identifier',
      value: 'abc',
    },
    {
      key: 'Version',
      value: '1.9.5',
    },
    {
      key: 'Last Updated',
      value: 'n/a',
    },
  ]
  const secondHeading = 'Marketplace'
  const secondEntries: readonly MoreInfoEntry[] = [
    {
      key: 'Published',
      value: 'n/a',
    },
    {
      key: 'Last Released',
      value: 'n/a',
    },
  ]
  const thirdHeading = 'Categories'
  const categories: readonly Category[] = [
    {
      id: 'themes',
      label: 'Themes',
    },
  ]
  const dom = [
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailPanel,
      childCount: 2,
      role: AriaRoles.Panel,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Markdown,
      role: AriaRoles.Document,
      onContextMenu: DomEventListenerFunctions.HandleReadmeContextMenu,
      childCount,
    },
    ...markdownDom,
    {
      type: VirtualDomElements.Div,
      className: 'Aside',
      childCount: 1,
    },
    ...GetAdditionalDetailsVirtualDom.getAdditionalDetailsVirtualDom(firstHeading, entries, secondHeading, secondEntries, thirdHeading, categories),
  ]
  return dom
}
