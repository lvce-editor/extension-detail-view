import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetMarkdownImageErrorMessage from '../GetMarkdownImageErrorMessage/GetMarkdownImageErrorMessage.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

const markdownImageErrorNode: VirtualDomNode = {
  childCount: 2,
  className: ClassNames.MarkdownImageError,
  type: VirtualDomElements.Span,
}

const iconNode: VirtualDomNode = {
  childCount: 0,
  className: MergeClassNames.mergeClassNames(ClassNames.MaskIcon, ClassNames.MaskIconWarning),
  type: VirtualDomElements.Span,
}

export const getMarkdownImageErrorVirtualDom = (src: unknown): readonly VirtualDomNode[] => {
  const message = GetMarkdownImageErrorMessage.getMarkdownImageErrorMessage(src)
  const detail = typeof src === 'string' && src ? `${message}: ${src}` : message
  return [markdownImageErrorNode, iconNode, text(detail)]
}
