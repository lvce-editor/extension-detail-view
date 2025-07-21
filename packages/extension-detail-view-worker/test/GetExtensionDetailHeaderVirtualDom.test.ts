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
    name: 'Test Extension',
    iconSrc: './test-icon.png',
    description: 'Test Description',
  }
  const buttonDefs = GetExtensionDetailButtons.getExtensionDetailButtons(false, false)
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
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailHeader,
      childCount: 2,
    },
    {
      type: VirtualDomElements.Img,
      className: ClassNames.ExtensionDetailIcon,
      alt: '',
      draggable: false,
      childCount: 0,
      src: './test-icon.png',
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailHeaderDetails,
      childCount: 3,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailName,
      childCount: 1,
    },
    text('Test Extension'),
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailDescription,
      childCount: 1,
    },
    text('Test Description'),
  ])
})

test('handles missing extension details', () => {
  const extensionDetail = {
    name: '',
    iconSrc: '',
    description: '',
  }
  const buttonDefs = GetExtensionDetailButtons.getExtensionDetailButtons(false, false)
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
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailHeader,
      childCount: 2,
    },
    {
      type: VirtualDomElements.Img,
      className: ClassNames.ExtensionDetailIcon,
      alt: '',
      draggable: false,
      childCount: 0,
      src: '',
      onContextMenu: 'handleImageContextMenu',
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailHeaderDetails,
      childCount: 3,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailName,
      childCount: 1,
    },
    text(''),
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailDescription,
      childCount: 1,
    },
    text(''),
    {
      childCount: 4,
      className: 'ExtensionDetailHeaderActions',
      type: 4,
    },
    {
      childCount: 1,
      className: 'Button ButtonPrimary',
      onClick: 'handleClickDisable',
      name: InputName.Disable,
      type: 1,
    },
    {
      childCount: 0,
      text: ExtensionDetailStrings.disable(),
      type: 12,
    },
    {
      childCount: 1,
      className: 'Button ButtonPrimary',
      onClick: 'handleClickUninstall',
      name: InputName.Uninstall,
      type: 1,
    },
    {
      childCount: 0,
      text: ExtensionDetailStrings.uninstall(),
      type: 12,
    },
    {
      childCount: 1,
      className: 'SettingsButton',
      onClick: 'handleClickSettings',
      title: ExtensionDetailStrings.settings(),
      name: InputName.Settings,
      type: 1,
    },
    {
      childCount: 0,
      className: 'SettingsIcon',
      text: '⚙️',
      type: 8,
    },
  ])
})

test('handles builtin extension - shows only disable button', () => {
  const extensionDetail = {
    name: 'Builtin Extension',
    iconSrc: './builtin-icon.png',
    description: 'Builtin extension description',
  }
  const buttonDefs = GetExtensionDetailButtons.getExtensionDetailButtons(false, true)
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
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailHeader,
      childCount: 2,
    },
    {
      type: VirtualDomElements.Img,
      className: ClassNames.ExtensionDetailIcon,
      alt: '',
      draggable: false,
      childCount: 0,
      src: './builtin-icon.png',
      onContextMenu: 'handleImageContextMenu',
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailHeaderDetails,
      childCount: 3,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailName,
      childCount: 2,
    },
    text('Builtin Extension'),
    {
      type: VirtualDomElements.Span,
      className: ClassNames.ExtensionDetailNameBadge,
      childCount: 1,
    },
    text('builtin'),
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailDescription,
      childCount: 1,
    },
    text('Builtin extension description'),
    {
      childCount: 3,
      className: 'ExtensionDetailHeaderActions',
      type: 4,
    },
    {
      childCount: 1,
      className: 'Button ButtonPrimary',
      onClick: 'handleClickDisable',
      name: InputName.Disable,
      type: 1,
    },
    {
      childCount: 0,
      text: ExtensionDetailStrings.disable(),
      type: 12,
    },
    {
      childCount: 1,
      className: 'SettingsButton',
      onClick: 'handleClickSettings',
      title: ExtensionDetailStrings.settings(),
      name: InputName.Settings,
      type: 1,
    },
    {
      childCount: 0,
      className: 'SettingsIcon',
      text: '⚙️',
      type: 8,
    },
  ])
})
