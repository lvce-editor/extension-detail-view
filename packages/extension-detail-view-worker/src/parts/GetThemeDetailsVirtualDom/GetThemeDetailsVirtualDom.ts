import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ElementWithLabel } from '../ElementWithLabel/ElementWithLabel.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const headingNode: VirtualDomNode = {
  childCount: 1,
  type: VirtualDomElements.H3,
}

const listItemNode: VirtualDomNode = {
  childCount: 1,
  type: VirtualDomElements.Li,
}

const getItemVirtualDom = (item: ElementWithLabel, linksEnabled: boolean): readonly VirtualDomNode[] => {
  if (linksEnabled && item.path) {
    return [
      {
        childCount: 1,
        className: ClassNames.ColorThemeLink,
        href: '#',
        name: item.path,
        rel: 'noopener noreferrer',
        target: '_blank',
        title: item.path,
        type: VirtualDomElements.A,
      },
      text(item.label),
    ]
  }
  return [text(item.label)]
}

const getSectionVirtualDom = (heading: string, items: readonly ElementWithLabel[], linksEnabled: boolean = false): readonly VirtualDomNode[] => {
  if (items.length === 0) {
    return []
  }
  return [
    headingNode,
    text(heading),
    {
      childCount: items.length,
      type: VirtualDomElements.Ul,
    },
    ...items.flatMap((item) => {
      return [listItemNode, ...getItemVirtualDom(item, linksEnabled)]
    }),
  ]
}

export const getThemeDetailsVirtualDom = (
  colorThemes: readonly ElementWithLabel[],
  iconThemes: readonly ElementWithLabel[],
  productIconThemes: readonly ElementWithLabel[],
): readonly VirtualDomNode[] => {
  return [
    ...getSectionVirtualDom('Color Themes', colorThemes, true),
    ...getSectionVirtualDom('File Icon Themes', iconThemes),
    ...getSectionVirtualDom('Product Icon Themes', productIconThemes),
  ]
}
