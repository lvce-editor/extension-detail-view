import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

interface TitleProps {
  readonly title?: string
}

const getTitleProps = (title: string | undefined): TitleProps => {
  if (title) {
    return { title }
  }
  return {}
}

export const getCellLinkVirtualDom = (
  value: string,
  props?: { readonly className?: string; readonly title?: string; readonly href: string },
): readonly VirtualDomNode[] => {
  const tdClassName = props?.className ? `${ClassNames.TableCell} ${props.className}` : ClassNames.TableCell
  return [
    {
      childCount: 1,
      className: tdClassName,
      type: VirtualDomElements.Td,
      ...getTitleProps(props?.title),
    },
    {
      childCount: 1,
      className: ClassNames.Link,
      href: props?.href,
      type: VirtualDomElements.A,
    },
    text(value),
  ]
}
