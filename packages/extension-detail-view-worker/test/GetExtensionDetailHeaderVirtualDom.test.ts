import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as ExtensionDetailStrings from '../src/parts/ExtensionDetailStrings/ExtensionDetailStrings.ts'
import * as GetExtensionDetailButtons from '../src/parts/GetExtensionDetailButtons/GetExtensionDetailButtons.ts'
import * as GetExtensionDetailHeaderVirtualDom from '../src/parts/GetExtensionDetailHeaderVirtualDom/GetExtensionDetailHeaderVirtualDom.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test.skip('extension detail header virtual dom', () => {
  const extensionDetail = {
    description: 'Test Description',
    iconSrc: './test-icon.png',
    name: 'Test Extension',
  }
  const buttonDefs = GetExtensionDetailButtons.getExtensionDetailButtons(false, false, false)
  expect(
    GetExtensionDetailHeaderVirtualDom.getExtensionDetailHeaderVirtualDom(
      extensionDetail.name,
      extensionDetail.iconSrc,
      extensionDetail.description,
      '',
      buttonDefs,
      true,
    ),
  ).toEqual([
    {
      childCount: 2,
      className: ClassNames.ExtensionDetailHeader,
      type: VirtualDomElements.Div,
    },
    {
      alt: '',
      childCount: 0,
      className: ClassNames.ExtensionDetailIcon,
      draggable: false,
      src: './test-icon.png',
      type: VirtualDomElements.Img,
    },
    {
      childCount: 3,
      className: ClassNames.ExtensionDetailHeaderDetails,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.ExtensionDetailName,
      type: VirtualDomElements.Div,
    },
    text('Test Extension'),
    {
      childCount: 1,
      className: ClassNames.ExtensionDetailDescription,
      type: VirtualDomElements.Div,
    },
    text('Test Description'),
  ])
})

test.skip('handles missing extension details', () => {
  const extensionDetail = {
    description: '',
    iconSrc: '',
    name: '',
  }
  const buttonDefs = GetExtensionDetailButtons.getExtensionDetailButtons(false, false, false)
  expect(
    GetExtensionDetailHeaderVirtualDom.getExtensionDetailHeaderVirtualDom(
      extensionDetail.name,
      extensionDetail.iconSrc,
      extensionDetail.description,
      '',
      buttonDefs,
      true,
    ),
  ).toEqual([
    {
      childCount: 2,
      className: ClassNames.ExtensionDetailHeader,
      type: VirtualDomElements.Div,
    },
    {
      alt: '',
      childCount: 0,
      className: ClassNames.ExtensionDetailIcon,
      draggable: false,
      onContextMenu: 'handleImageContextMenu',
      src: '',
      type: VirtualDomElements.Img,
    },
    {
      childCount: 3,
      className: ClassNames.ExtensionDetailHeaderDetails,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: ClassNames.ExtensionDetailName,
      type: VirtualDomElements.Div,
    },
    text(''),
    {
      childCount: 1,
      className: ClassNames.ExtensionDetailDescription,
      type: VirtualDomElements.Div,
    },
    text(''),
    {
      childCount: 4,
      className: 'ExtensionDetailHeaderActions',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'Button ButtonPrimary',
      name: InputName.Disable,
      onClick: 'handleClickDisable',
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      text: ExtensionDetailStrings.disable(),
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      className: 'Button ButtonPrimary',
      name: InputName.Uninstall,
      onClick: 'handleClickUninstall',
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      text: ExtensionDetailStrings.uninstall(),
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      className: 'SettingsButton',
      name: InputName.Settings,
      onClick: 'handleClickSettings',
      title: ExtensionDetailStrings.settings(),
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      className: 'SettingsIcon',
      text: '⚙️',
      type: VirtualDomElements.Span,
    },
  ])
})

test.skip('handles builtin extension - shows only disable button', () => {
  const extensionDetail = {
    description: 'Builtin extension description',
    iconSrc: './builtin-icon.png',
    name: 'Builtin Extension',
  }
  const buttonDefs = GetExtensionDetailButtons.getExtensionDetailButtons(false, true, false)
  expect(
    GetExtensionDetailHeaderVirtualDom.getExtensionDetailHeaderVirtualDom(
      extensionDetail.name,
      extensionDetail.iconSrc,
      extensionDetail.description,
      'builtin',
      buttonDefs,
      true,
    ),
  ).toEqual([
    {
      childCount: 2,
      className: ClassNames.ExtensionDetailHeader,
      type: VirtualDomElements.Div,
    },
    {
      alt: '',
      childCount: 0,
      className: ClassNames.ExtensionDetailIcon,
      draggable: false,
      onContextMenu: 'handleImageContextMenu',
      src: './builtin-icon.png',
      type: VirtualDomElements.Img,
    },
    {
      childCount: 3,
      className: ClassNames.ExtensionDetailHeaderDetails,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 2,
      className: ClassNames.ExtensionDetailName,
      type: VirtualDomElements.Div,
    },
    text('Builtin Extension'),
    {
      childCount: 1,
      className: ClassNames.ExtensionDetailNameBadge,
      type: VirtualDomElements.Span,
    },
    text('builtin'),
    {
      childCount: 1,
      className: ClassNames.ExtensionDetailDescription,
      type: VirtualDomElements.Div,
    },
    text('Builtin extension description'),
    {
      childCount: 3,
      className: 'ExtensionDetailHeaderActions',
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      className: 'Button ButtonPrimary',
      name: InputName.Disable,
      onClick: 'handleClickDisable',
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      text: ExtensionDetailStrings.disable(),
      type: VirtualDomElements.Text,
    },
    {
      childCount: 1,
      className: 'SettingsButton',
      name: InputName.Settings,
      onClick: 'handleClickSettings',
      title: ExtensionDetailStrings.settings(),
      type: VirtualDomElements.Button,
    },
    {
      childCount: 0,
      className: 'SettingsIcon',
      text: '⚙️',
      type: VirtualDomElements.Span,
    },
  ])
})
