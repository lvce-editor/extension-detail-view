import type { MoreInfoEntry } from '../MoreInfoEntry/MoreInfoEntry.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as GetMoreInfoEntryValueClassName from '../GetMoreInfoEntryValueClassName/GetMoreInfoEntryValueClassName.ts'
import * as GetMoreInfoEntryValueTag from '../GetMoreInfoEntryValueTag/GetMoreInfoEntryValueTag.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

interface MutableExtraProps {
  title?: string
  tabIndex?: number
}

interface ExtraProps {
  readonly title?: string
  readonly tabIndex?: number
}

const getExtraProps = (title: string | undefined, onClick: string | number | undefined): ExtraProps => {
  const props: MutableExtraProps = Object.create(null)
  if (title) {
    props.title = title
  }
  if (onClick) {
    props.tabIndex = 0
  }
  return props
}

export const getMoreInfoEntryValueVirtualDom = (item: MoreInfoEntry): readonly VirtualDomNode[] => {
  const { value, onClick, code, title } = item
  const type = GetMoreInfoEntryValueTag.getMoreInfoEntryValueTag(onClick, code)
  const className = GetMoreInfoEntryValueClassName.getMoreInfoEntryValueClassName(onClick, code)
  const extraProps = getExtraProps(title, onClick)
  return [
    {
      type,
      className,
      childCount: 1,
      onClick,
      ...extraProps,
    },
    text(value),
  ]
}
