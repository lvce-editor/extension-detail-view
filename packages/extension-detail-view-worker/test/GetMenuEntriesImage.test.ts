import { expect, test } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import type { ContextMenuProps } from '../src/parts/ContextMenuProps/ContextMenuProps.ts'
import type { ExtensionDetailState } from '../src/parts/ExtensionDetailState/ExtensionDetailState.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import { getMenuEntriesImage } from '../src/parts/GetMenuEntriesImage/GetMenuEntriesImage.ts'

test('returns image menu entries', () => {
  const state: ExtensionDetailState = createDefaultState()
  const props: ContextMenuProps = {
    menuId: MenuEntryId.ExtensionDetailIconContextMenu,
  }
  expect(getMenuEntriesImage(state, props)).toBeDefined()
})
