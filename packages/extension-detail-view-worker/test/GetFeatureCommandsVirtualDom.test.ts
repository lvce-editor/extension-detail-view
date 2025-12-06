import { expect, test } from '@jest/globals'
import { VirtualDomElements } from '@lvce-editor/virtual-dom-worker'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetFeatureCommandsVirtualDom from '../src/parts/GetFeatureCommandsVirtualDom/GetFeatureCommandsVirtualDom.ts'
import { getFeatureDetailsCommand } from '../src/parts/GetFeatureDetailsCommands/GetFeatureDetailsCommands.ts'
import { text } from '../src/parts/VirtualDomHelpers/VirtualDomHelpers.ts'

test('feature commands virtual dom with commands', () => {
  const extension = {
    commands: [
      {
        id: 'workbench.action.openFile',
        label: 'Open File',
      },
      {
        id: 'workbench.action.saveFile',
        label: 'Save File',
      },
    ],
  }
  const { commands } = getFeatureDetailsCommand(extension)
  expect(GetFeatureCommandsVirtualDom.getFeatureCommandsVirtualDom(commands || [])).toEqual([
    {
      childCount: 2,
      className: ClassNames.FeatureContent,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 1,
      type: VirtualDomElements.H1,
    },
    text('Commands'),
    {
      childCount: 2,
      className: ClassNames.Table,
      type: VirtualDomElements.Table,
    },
    {
      childCount: 1,
      type: VirtualDomElements.THead,
    },
    {
      childCount: 2,
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: ClassNames.TableHeading,
      type: VirtualDomElements.Th,
    },
    text('ID'),
    {
      childCount: 1,
      className: ClassNames.TableHeading,
      type: VirtualDomElements.Th,
    },
    text('Label'),
    {
      childCount: 2,
      type: VirtualDomElements.TBody,
    },
    {
      childCount: 2,
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: ClassNames.TableCell,
      type: VirtualDomElements.Td,
    },
    {
      childCount: 1,
      type: VirtualDomElements.Code,
    },
    text('workbench.action.openFile'),
    {
      childCount: 1,
      className: ClassNames.TableCell,
      type: VirtualDomElements.Td,
    },
    text('Open File'),
    {
      childCount: 2,
      type: VirtualDomElements.Tr,
    },
    {
      childCount: 1,
      className: ClassNames.TableCell,
      type: VirtualDomElements.Td,
    },
    {
      childCount: 1,
      type: VirtualDomElements.Code,
    },
    text('workbench.action.saveFile'),
    {
      childCount: 1,
      className: ClassNames.TableCell,
      type: VirtualDomElements.Td,
    },
    text('Save File'),
  ])
})
