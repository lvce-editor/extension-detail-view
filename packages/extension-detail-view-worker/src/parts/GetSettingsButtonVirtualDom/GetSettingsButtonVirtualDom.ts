import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as InputName from '../InputName/InputName.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'

const settingsButtonNode: VirtualDomNode = {
  ariaHasPopup: 'menu',
  ariaLabel: ExtensionDetailStrings.settings(),
  childCount: 1,
  className: MergeClassNames.mergeClassNames(ClassNames.IconButton, ClassNames.SettingsButton),
  name: InputName.Settings,
  onClick: DomEventListenerFunctions.HandleClickSettings,
  title: ExtensionDetailStrings.settings(),
  type: VirtualDomElements.Button,
}

const settingsIconNode: VirtualDomNode = {
  childCount: 0,
  className: MergeClassNames.mergeClassNames(ClassNames.MaskIcon, ClassNames.MaskIconSettingsGear),
  type: VirtualDomElements.Span,
}

export const getSettingsButtonVirtualDom = (enabled: boolean): readonly VirtualDomNode[] => {
  if (!enabled) {
    return []
  }
  return [settingsButtonNode, settingsIconNode]
}
