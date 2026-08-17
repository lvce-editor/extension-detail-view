import { text, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetMarkdownImageErrorMessage from '../GetMarkdownImageErrorMessage/GetMarkdownImageErrorMessage.ts'

const markdownImageErrorNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.MarkdownImageError,
  type: VirtualDomElements.Span,
}

export const getMarkdownImageErrorVirtualDom = (src: unknown): readonly VirtualDomNode[] => {
  return [markdownImageErrorNode, text(GetMarkdownImageErrorMessage.getMarkdownImageErrorMessage(src))]
}
