import { expect, test } from '@jest/globals'
import * as GetExtensionDetailContentVirtualDom from '../src/parts/GetExtensionDetailContentVirtualDom/GetExtensionDetailContentVirtualDom.ts'
import * as InputName from '../src/parts/InputName/InputName.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'
import * as AriaRoles from '../src/parts/AriaRoles/AriaRoles.ts'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('details tab', () => {
  const sanitizedReadmeHtml = '<h1>Test Header</h1>'
  expect(GetExtensionDetailContentVirtualDom.getExtensionDetailContentVirtualDom(sanitizedReadmeHtml, InputName.Details)).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.ExtensionDetailPanel,
      childCount: 1,
      role: AriaRoles.Panel,
    },
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Markdown,
      role: AriaRoles.Document,
      onContextMenu: DomEventListenerFunctions.HandleReadmeContextMenu,
      childCount: 1,
    },
    {
      type: VirtualDomElements.H1,
      childCount: 1,
    },
    text('Test Header'),
  ])
})

test('features tab', () => {
  expect(GetExtensionDetailContentVirtualDom.getExtensionDetailContentVirtualDom('', InputName.Features)).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Features,
      childCount: 1,
    },
    text('Not Implemented'),
  ])
})

test('changelog tab', () => {
  expect(GetExtensionDetailContentVirtualDom.getExtensionDetailContentVirtualDom('', InputName.Changelog)).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.Changelog,
      childCount: 1,
    },
    text('Not Implemented'),
  ])
})

test('unknown tab', () => {
  expect(GetExtensionDetailContentVirtualDom.getExtensionDetailContentVirtualDom('', 'unknown')).toEqual([])
})
