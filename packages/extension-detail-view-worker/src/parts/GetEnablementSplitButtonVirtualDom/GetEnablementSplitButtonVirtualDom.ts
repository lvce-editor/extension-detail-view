import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import type { ExtensionDetailButton } from '../GetExtensionDetailButtons/ExtensionDetailButton.ts'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as InputName from '../InputName/InputName.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const primaryClassName = MergeClassNames.mergeClassNames(
  ClassNames.Button,
  ClassNames.ButtonPrimary,
  ClassNames.ExtensionEnablementSplitButtonPrimary,
)

const dropDownClassName = MergeClassNames.mergeClassNames(
  ClassNames.Button,
  ClassNames.ButtonPrimary,
  ClassNames.ExtensionEnablementSplitButtonDropDown,
)

const splitButtonNode: VirtualDomNode = {
  childCount: 2,
  className: ClassNames.ExtensionEnablementSplitButton,
  type: VirtualDomElements.Div,
}

const chevronNode: VirtualDomNode = {
  childCount: 0,
  className: MergeClassNames.mergeClassNames(ClassNames.MaskIcon, ClassNames.MaskIconChevronDown),
  type: VirtualDomElements.Div,
}

export const getEnablementSplitButtonVirtualDom = (button: ExtensionDetailButton): readonly VirtualDomNode[] => {
  const isEnable = button.name === InputName.Enable
  return [
    splitButtonNode,
    {
      childCount: 1,
      className: primaryClassName,
      name: button.name,
      onClick: button.onClick,
      ...(button.onMouseEnter ? { onMouseEnter: button.onMouseEnter } : {}),
      ...(button.onMouseLeave ? { onMouseLeave: button.onMouseLeave } : {}),
      type: VirtualDomElements.Button,
    },
    text(button.label),
    {
      ariaLabel: isEnable ? ExtensionDetailStrings.enableOptions() : ExtensionDetailStrings.disableOptions(),
      childCount: 1,
      className: dropDownClassName,
      name: isEnable ? InputName.EnableOptions : InputName.DisableOptions,
      onClick: button.menuOnClick,
      title: isEnable ? ExtensionDetailStrings.enableOptions() : ExtensionDetailStrings.disableOptions(),
      type: VirtualDomElements.Button,
    },
    chevronNode,
  ]
}
