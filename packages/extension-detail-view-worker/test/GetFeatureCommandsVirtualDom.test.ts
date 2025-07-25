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
        label: 'Open File',
        id: 'workbench.action.openFile',
      },
      {
        label: 'Save File',
        id: 'workbench.action.saveFile',
      },
    ],
  }
  const { commands } = getFeatureDetailsCommand(extension)
  expect(GetFeatureCommandsVirtualDom.getFeatureCommandsVirtualDom(commands || [])).toEqual([
    {
      type: VirtualDomElements.Div,
      className: ClassNames.FeatureContent,
      childCount: 2,
    },
    {
      type: VirtualDomElements.H1,
      childCount: 1,
    },
    text('Commands'),
    {
      type: VirtualDomElements.Table,
      className: ClassNames.Table,
      childCount: 2,
    },
    {
      type: VirtualDomElements.THead,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Tr,
      childCount: 2,
    },
    {
      type: VirtualDomElements.Th,
      className: ClassNames.TableHeading,
      childCount: 1,
    },
    text('ID'),
    {
      type: VirtualDomElements.Th,
      className: ClassNames.TableHeading,
      childCount: 1,
    },
    text('Label'),
    {
      type: VirtualDomElements.TBody,
      childCount: 2,
    },
    {
      type: VirtualDomElements.Tr,
      childCount: 2,
    },
    {
      type: VirtualDomElements.Td,
      className: ClassNames.TableCell,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Code,
      childCount: 1,
    },
    text('workbench.action.openFile'),
    {
      type: VirtualDomElements.Td,
      className: ClassNames.TableCell,
      childCount: 1,
    },
    text('Open File'),
    {
      type: VirtualDomElements.Tr,
      childCount: 2,
    },
    {
      type: VirtualDomElements.Td,
      className: ClassNames.TableCell,
      childCount: 1,
    },
    {
      type: VirtualDomElements.Code,
      childCount: 1,
    },
    text('workbench.action.saveFile'),
    {
      type: VirtualDomElements.Td,
      className: ClassNames.TableCell,
      childCount: 1,
    },
    text('Save File'),
  ])
})
