import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const getTag = (onClick: string | undefined, code: boolean | undefined): number => {
  if (onClick) {
    return VirtualDomElements.A
  }
  if (code) {
    // TODO use code tag
    return VirtualDomElements.Div
  }
  return VirtualDomElements.Div
}

const getClassName = (onClick: string | undefined, code: boolean | undefined): string => {
  if (onClick) {
    return ClassNames.MoreInfoEntryValue + ' Link'
  }
  if (code) {
    return ClassNames.MoreInfoEntryValue + ' Code'
  }
  return ClassNames.MoreInfoEntryValue
}

export const getMoreInfoEntryValueVirtualDom = (item: MoreInfoEntry): readonly VirtualDomNode[] => {
  const { value, onClick, code } = item
  const type = getTag(onClick, code)
  const className = getClassName(onClick, code)
  return [
    {
      type: type,
      className,
      childCount: 1,
      onClick,
    },
    text(value),
  ]
}
