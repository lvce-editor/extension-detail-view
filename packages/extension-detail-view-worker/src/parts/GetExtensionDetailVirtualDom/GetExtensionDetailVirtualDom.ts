import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetExtensionDetailContentVirtualDom from '../GetExtensionDetailContentVirtualDom/GetExtensionDetailContentVirtualDom.ts'
import * as GetExtensionDetailHeaderVirtualDom from '../GetExtensionDetailHeaderVirtualDom/GetExtensionDetailHeaderVirtualDom.ts'
import * as GetTabsVirtualDom from '../GetTabsVirtualDom/GetTabsVirtualDom.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import type { Tab } from '../Tab/Tab.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'

export const getExtensionDetailVirtualDom = (extensionDetail: any, sanitizedReadmeHtml: string): readonly VirtualDomNode[] => {
  const tabs: readonly Tab[] = [
    {
      label: 'Details',
      selected: true,
    },
    {
      label: 'Features',
      selected: false,
    },
    {
      label: 'Changelog',
      selected: false,
    },
  ]
  const dom = [
    {
      type: VirtualDomElements.Div,
      className: MergeClassNames.mergeClassNames(ClassNames.Viewlet, ClassNames.ExtensionDetail),
      childCount: 3,
    },
    ...GetExtensionDetailHeaderVirtualDom.getExtensionDetailHeaderVirtualDom(extensionDetail),
    ...GetTabsVirtualDom.getTabsVirtualDom(tabs),
    ...GetExtensionDetailContentVirtualDom.getExtensionDetailContentVirtualDom(sanitizedReadmeHtml),
  ]
  return dom
}
