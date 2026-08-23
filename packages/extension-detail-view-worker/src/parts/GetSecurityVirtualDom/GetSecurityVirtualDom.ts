import { mergeClassNames, AriaRoles, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { SecurityEntry } from '../SecurityEntry/SecurityEntry.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import { getSecurityInfo } from '../GetSecurityInfo/GetSecurityInfo.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const securityPanelNode: VirtualDomNode = {
  childCount: 3,
  className: mergeClassNames(ClassNames.FeatureContent, ClassNames.Security),
  role: AriaRoles.Panel,
  type: VirtualDomElements.Div,
}

const securityHeadingNode: VirtualDomNode = {
  childCount: 1,
  type: VirtualDomElements.H1,
}

const securityDescriptionNode: VirtualDomNode = {
  childCount: 1,
  className: ClassNames.SecurityDescription,
  type: VirtualDomElements.P,
}

const securityTableNode: VirtualDomNode = {
  childCount: 2,
  className: mergeClassNames(ClassNames.Table, ClassNames.SecurityTable),
  type: VirtualDomElements.Table,
}

const tableHeadNode: VirtualDomNode = {
  childCount: 1,
  type: VirtualDomElements.THead,
}

const tableHeadRowNode: VirtualDomNode = {
  childCount: 3,
  type: VirtualDomElements.Tr,
}

const tableHeadingNode: VirtualDomNode = {
  childCount: 1,
  className: mergeClassNames(ClassNames.TableHeading, ClassNames.TableCell),
  type: VirtualDomElements.Th,
}

const getHeading = (value: string): readonly VirtualDomNode[] => {
  return [tableHeadingNode, text(value)]
}

const getCell = (value: string): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 1,
      className: ClassNames.TableCell,
      title: value,
      type: VirtualDomElements.Td,
    },
    text(value),
  ]
}

const getRow = (entry: SecurityEntry): readonly VirtualDomNode[] => {
  return [
    {
      childCount: 3,
      className: mergeClassNames(ClassNames.SecurityRow, entry.id),
      type: VirtualDomElements.Tr,
    },
    ...getCell(entry.label),
    ...getCell(entry.access),
    ...getCell(entry.details),
  ]
}

export const getSecurityVirtualDom = (extension: any): readonly VirtualDomNode[] => {
  const entries = getSecurityInfo(extension)
  return [
    securityPanelNode,
    securityHeadingNode,
    text(ExtensionDetailStrings.security()),
    securityDescriptionNode,
    text(ExtensionDetailStrings.securityDisclaimer()),
    securityTableNode,
    tableHeadNode,
    tableHeadRowNode,
    ...getHeading(ExtensionDetailStrings.securityCapability()),
    ...getHeading(ExtensionDetailStrings.securityAccess()),
    ...getHeading(ExtensionDetailStrings.securityDetails()),
    {
      childCount: entries.length,
      type: VirtualDomElements.TBody,
    },
    ...entries.flatMap(getRow),
  ]
}
