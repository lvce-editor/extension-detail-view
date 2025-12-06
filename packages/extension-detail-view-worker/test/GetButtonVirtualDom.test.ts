import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetButtonVirtualDom from '../src/parts/GetButtonVirtualDom/GetButtonVirtualDom.ts'
import * as MergeClassNames from '../src/parts/MergeClassNames/MergeClassNames.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('getButtonVirtualDom - with string onClick', () => {
  const message = 'Click Me'
  const onClick = 'handleClick'
  const name = 'myButton'
  expect(GetButtonVirtualDom.getButtonVirtualDom(message, onClick, name)).toEqual([
    {
      childCount: 1,
      className: MergeClassNames.mergeClassNames(ClassNames.Button, ClassNames.ButtonPrimary),
      name: 'myButton',
      onClick: 'handleClick',
      type: VirtualDomElements.Button,
    },
    text('Click Me'),
  ])
})

test('getButtonVirtualDom - with number onClick', () => {
  const message = 'Enable'
  const onClick = 5
  const name = 'enableButton'
  expect(GetButtonVirtualDom.getButtonVirtualDom(message, onClick, name)).toEqual([
    {
      childCount: 1,
      className: MergeClassNames.mergeClassNames(ClassNames.Button, ClassNames.ButtonPrimary),
      name: 'enableButton',
      onClick: 5,
      type: VirtualDomElements.Button,
    },
    text('Enable'),
  ])
})

test('getButtonVirtualDom - with empty message', () => {
  const message = ''
  const onClick = 1
  const name = 'emptyButton'
  expect(GetButtonVirtualDom.getButtonVirtualDom(message, onClick, name)).toEqual([
    {
      childCount: 1,
      className: MergeClassNames.mergeClassNames(ClassNames.Button, ClassNames.ButtonPrimary),
      name: 'emptyButton',
      onClick: 1,
      type: VirtualDomElements.Button,
    },
    text(''),
  ])
})

test('getButtonVirtualDom - with long message', () => {
  const message = 'This is a very long button message that spans multiple words'
  const onClick = 'handleLongClick'
  const name = 'longButton'
  expect(GetButtonVirtualDom.getButtonVirtualDom(message, onClick, name)).toEqual([
    {
      childCount: 1,
      className: MergeClassNames.mergeClassNames(ClassNames.Button, ClassNames.ButtonPrimary),
      name: 'longButton',
      onClick: 'handleLongClick',
      type: VirtualDomElements.Button,
    },
    text('This is a very long button message that spans multiple words'),
  ])
})
