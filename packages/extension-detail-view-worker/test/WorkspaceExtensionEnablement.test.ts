import { expect, test } from '@jest/globals'
import { ExtensionManagementWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { disableWorkspaceExtension } from '../src/parts/DisableWorkspaceExtension/DisableWorkspaceExtension.ts'
import { enableWorkspaceExtension } from '../src/parts/EnableWorkspaceExtension/EnableWorkspaceExtension.ts'
import { handleClickDisableOptions } from '../src/parts/HandleClickDisableOptions/HandleClickDisableOptions.ts'
import { handleClickDisableWorkspace } from '../src/parts/HandleClickDisableWorkspace/HandleClickDisableWorkspace.ts'
import { handleClickEnableOptions } from '../src/parts/HandleClickEnableOptions/HandleClickEnableOptions.ts'
import { handleClickEnableWorkspace } from '../src/parts/HandleClickEnableWorkspace/HandleClickEnableWorkspace.ts'

test('enableWorkspaceExtension invokes the workspace command', async () => {
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.enableWorkspace'() {},
  })

  await enableWorkspaceExtension('sample.extension')

  expect(mockRpc.invocations).toEqual([['Extensions.enableWorkspace', 'sample.extension']])
})

test('disableWorkspaceExtension invokes the workspace command', async () => {
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.disableWorkspace'() {},
  })

  await disableWorkspaceExtension('sample.extension')

  expect(mockRpc.invocations).toEqual([['Extensions.disableWorkspace', 'sample.extension']])
})

test('enable options opens the enablement menu at the click coordinates', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
  })
  const state = { ...createDefaultState(), uid: 42 }

  const result = await handleClickEnableOptions(state, 100, 200)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ContextMenu.show2', 42, 4093, 100, 200, { menuId: 4093 }]])
})

test('disable options opens the disablement menu at the click coordinates', async () => {
  using mockRpc = RendererWorker.registerMockRpc({
    'ContextMenu.show2'() {},
  })
  const state = { ...createDefaultState(), uid: 42 }

  const result = await handleClickDisableOptions(state, 300, 400)

  expect(result).toBe(state)
  expect(mockRpc.invocations).toEqual([['ContextMenu.show2', 42, 4094, 300, 400, { menuId: 4094 }]])
})

test('handleClickEnableWorkspace updates the detail to workspace-enabled state', async () => {
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.enableWorkspace'() {},
    'Extensions.getExtension'() {
      return {
        disabled: false,
        enablementState: 'enabledWorkspace',
        hasWorkspace: true,
        id: 'sample.extension',
      }
    },
  })
  const state = { ...createDefaultState(), extensionId: 'sample.extension' }

  const result = await handleClickEnableWorkspace(state)

  expect(result.disabled).toBe(false)
  expect(result.buttons).toContainEqual({
    enabled: true,
    label: 'Disable',
    menuId: 4094,
    menuOnClick: 26,
    name: 'Disable',
    onClick: 2,
  })
  expect(mockRpc.invocations).toEqual([
    ['Extensions.enableWorkspace', 'sample.extension'],
    ['Extensions.getExtension', 'sample.extension'],
  ])
})

test('handleClickDisableWorkspace updates the detail to workspace-disabled state', async () => {
  using mockRpc = ExtensionManagementWorker.registerMockRpc({
    'Extensions.disableWorkspace'() {},
    'Extensions.getExtension'() {
      return {
        disabled: true,
        enablementState: 'disabledWorkspace',
        hasWorkspace: true,
        id: 'sample.extension',
      }
    },
  })
  const state = { ...createDefaultState(), extensionId: 'sample.extension' }

  const result = await handleClickDisableWorkspace(state)

  expect(result.disabled).toBe(true)
  expect(result.buttons).toContainEqual({
    enabled: true,
    label: 'Enable',
    menuId: 4093,
    menuOnClick: 25,
    name: 'Enable',
    onClick: 3,
    onMouseEnter: 20,
    onMouseLeave: 21,
  })
  expect(mockRpc.invocations).toEqual([
    ['Extensions.disableWorkspace', 'sample.extension'],
    ['Extensions.getExtension', 'sample.extension'],
  ])
})
