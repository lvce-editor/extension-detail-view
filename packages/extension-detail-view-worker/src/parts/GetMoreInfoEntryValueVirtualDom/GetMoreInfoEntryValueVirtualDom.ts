import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const getTag = (onClick: string | undefined, code: boolean | undefined): number => {
  if (onClick) {
    return VirtualDomElements.A
  }
  if (code) {
    return VirtualDomElements.Code
  }
  return VirtualDomElements.Dd
}

const getClassName = (onClick: string | undefined, code: boolean | undefined): string => {
  if (onClick) {
    return MergeClassNames.mergeClassNames(ClassNames.MoreInfoEntryValue, ClassNames.Link)
  }
  if (code) {
    return MergeClassNames.mergeClassNames(ClassNames.MoreInfoEntryValue, ClassNames.Code)
  }
  return ClassNames.MoreInfoEntryValue
}

export const getMoreInfoEntryValueVirtualDom = (item: MoreInfoEntry): readonly VirtualDomNode[] => {
  const { value, onClick, code, title } = item
  const type = getTag(onClick, code)
  const className = getClassName(onClick, code)
  return [
    {
      type: type,
      className,
      childCount: 1,
      onClick,
      title,
    },
    text(value),
  ]
}
