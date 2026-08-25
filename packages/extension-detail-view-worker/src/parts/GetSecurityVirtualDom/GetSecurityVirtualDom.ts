import { mergeClassNames, AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { SecurityEntry } from '../SecurityEntry/SecurityEntry.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import { getSecurityInfo } from '../GetSecurityInfo/GetSecurityInfo.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const securityPanelNode: VirtualDomNode = {
  childCount: 2,
  className: mergeClassNames(ClassNames.FeatureContent, ClassNames.Security),
  role: AriaRoles.Panel,
  type: VirtualDomElements.Div,
}

const securityHeadingNode: VirtualDomNode = {
  childCount: 1,
  type: VirtualDomElements.H1,
}

const securityValueNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.SecurityDefinitionListValue,
  type: VirtualDomElements.Dd,
}

const getEntry = (entry: SecurityEntry): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: mergeClassNames(ClassNames.SecurityDefinitionListKey, entry.id),
      type: VirtualDomElements.Dt,
    },
    text(entry.label),
    securityValueNode,
    text(entry.value),
  ]
}

export const getSecurityVirtualDom = (extension: any): readonly VirtualDomNode[] => {
  const entries = getSecurityInfo(extension)
  return [
    securityPanelNode,
    securityHeadingNode,
    text(ExtensionDetailStrings.security()),
    {
      childCount: entries.length * 2,
      className: ClassNames.SecurityDefinitionList,
      type: VirtualDomElements.Dl,
    },
    ...entries.flatMap(getEntry),
  ]
}
