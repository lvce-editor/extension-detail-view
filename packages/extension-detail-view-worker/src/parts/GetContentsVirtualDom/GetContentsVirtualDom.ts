import { DirentType } from '@lvce-editor/constants'
import { AriaRoles, mergeClassNames, VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const isDirectory = (type: number): boolean => type === DirentType.Directory || type === DirentType.DirectoryExpanded

const contentsPanel = {
  childCount: 2,
  className: mergeClassNames(ClassNames.ExtensionDetailPanel, ClassNames.ExtensionDetailContents),
  role: AriaRoles.Panel,
  type: VirtualDomElements.Div,
}

const contentViewer = {
  childCount: 1,
  className: ClassNames.ExtensionDetailContentViewer,
  type: VirtualDomElements.Div,
}

const contentFile = {
  childCount: 1,
  className: ClassNames.ExtensionDetailContentFile,
  type: VirtualDomElements.Div,
}

const getContentItemVirtualDom = (state: ExtensionDetailState, entry: ExtensionDetailState['contentEntries'][number]): readonly VirtualDomNode[] => {
  const { contentExpandedUris, contentSelectedUri } = state
  const directory = isDirectory(entry.type)
  const selected = entry.uri === contentSelectedUri
  const expanded = contentExpandedUris.includes(entry.uri)
  const className = mergeClassNames(ClassNames.ExtensionDetailContentTreeItem, selected ? ClassNames.ExtensionDetailContentTreeItemSelected : '')
  const node: VirtualDomNode = {
    ariaSelected: selected,
    childCount: 1,
    className,
    name: entry.uri,
    onClick: DomEventListenerFunctions.HandleContentsClick,
    role: AriaRoles.TreeItem,
    // eslint-disable-next-line virtual-dom/no-inline-style
    style: `padding-left: ${entry.depth * 16 + 8}px`,
    type: VirtualDomElements.Button,
  }
  const item = directory ? { ...node, ariaExpanded: expanded } : node
  return [item, text(entry.name)]
}

export const getContentsVirtualDom = (state: ExtensionDetailState): readonly VirtualDomNode[] => {
  const { contentEntries, contentError, contentFileContent, contentSelectedUri } = state
  let fileContent
  if (contentError) {
    fileContent = ExtensionDetailStrings.unableToLoadExtensionContents(contentError)
  } else if (contentSelectedUri) {
    fileContent = contentFileContent
  } else {
    fileContent = ExtensionDetailStrings.noExtensionContents()
  }
  return [
    contentsPanel,
    {
      childCount: contentEntries.length,
      className: ClassNames.ExtensionDetailContentTree,
      role: AriaRoles.Tree,
      type: VirtualDomElements.Div,
    },
    ...contentEntries.flatMap((entry) => getContentItemVirtualDom(state, entry)),
    contentViewer,
    contentFile,
    text(fileContent),
  ]
}
