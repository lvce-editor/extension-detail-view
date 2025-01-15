import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetExtensionDetailContentVirtualDom from '../GetExtensionDetailContentVirtualDom/GetExtensionDetailContentVirtualDom.ts'
import * as GetExtensionDetailHeaderVirtualDom from '../GetExtensionDetailHeaderVirtualDom/GetExtensionDetailHeaderVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getExtensionDetailVirtualDom = (extensionDetail: any, sanitizedReadmeHtml: string): readonly VirtualDomNode[] => {
  const dom = [
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.ExtensionDetail),
      childCount: 2,
    },
    ...GetExtensionDetailHeaderVirtualDom.getExtensionDetailHeaderVirtualDom(extensionDetail),
    ...GetExtensionDetailContentVirtualDom.getExtensionDetailContentVirtualDom(sanitizedReadmeHtml),
  ]
  return dom
}
