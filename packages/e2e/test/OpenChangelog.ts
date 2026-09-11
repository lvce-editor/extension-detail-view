import type { TestApi } from '@lvce-editor/test-with-playwright'

type ChangelogTestApi = Pick<TestApi, 'expect' | 'Extension' | 'ExtensionDetail' | 'Locator'>

export const openChangelog = async (api: ChangelogTestApi, extensionUri: string): Promise<void> => {
  // arrange
  await api.Extension.addWebExtension(extensionUri)

  // act
  await api.ExtensionDetail.open('test.extension-changelog')
  await api.ExtensionDetail.selectChangelog()

  // assert
  const changelog = api.Locator('.Changelog')
  await api.expect(changelog).toBeVisible()
}
