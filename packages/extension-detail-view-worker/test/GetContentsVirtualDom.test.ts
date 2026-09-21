import { expect, test } from '@jest/globals'
import { DirentType } from '@lvce-editor/constants'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import { createDefaultState } from '../src/parts/CreateDefaultState/CreateDefaultState.ts'
import * as GetContentsVirtualDom from '../src/parts/GetContentsVirtualDom/GetContentsVirtualDom.ts'

test('renders a two-pane tree and literal file content', () => {
  const state = {
    ...createDefaultState(),
    contentEntries: [
      { depth: 0, name: 'src', type: DirentType.Directory, uri: 'file:///extension/src' },
      { depth: 1, name: 'index.md', type: DirentType.File, uri: 'file:///extension/src/index.md' },
    ],
    contentExpandedUris: ['file:///extension/src'],
    contentFileContent: '<b>literal</b>',
    contentSelectedUri: 'file:///extension/src/index.md',
  }
  const result = GetContentsVirtualDom.getContentsVirtualDom(state)
  expect(result[0]).toMatchObject({ childCount: 2, className: `${ClassNames.ExtensionDetailPanel} ${ClassNames.ExtensionDetailContents}` })
  expect(result).toContainEqual(expect.objectContaining({ childCount: 2, className: ClassNames.ExtensionDetailContentTree }))
  expect(result).toContainEqual(expect.objectContaining({ ariaExpanded: true, name: 'file:///extension/src' }))
  expect(result.at(-1)).toMatchObject({ childCount: 0, text: '<b>literal</b>' })
})

test('renders empty and error content messages', () => {
  const empty = GetContentsVirtualDom.getContentsVirtualDom(createDefaultState())
  expect(empty.at(-1)).toEqual(expect.objectContaining({ text: 'No extension contents found.' }))
  const error = GetContentsVirtualDom.getContentsVirtualDom({ ...createDefaultState(), contentError: 'Error: failed' })
  expect(error.at(-1)).toEqual(expect.objectContaining({ text: 'Unable to load extension contents: Error: failed' }))
})
