import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async ({ Extension, ExtensionDetail, FileSystem }) => {
  // arrange
  const extensionUri = import.meta.resolve('../fixtures/extension-changelog-error')
  await Extension.addWebExtension(extensionUri)
  await ExtensionDetail.open('test.extension-changelog-error')

  // act
  await ExtensionDetail.selectChangelog()

  // assert
  const log = await FileSystem.readFile('memfs:///extension-detail-output.txt')
  if (!log.includes('Failed to load Changelog content')) {
    throw new Error('Expected the changelog failure in the extension detail output log')
  }
}
