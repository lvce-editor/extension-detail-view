import type { TestApi } from '@lvce-editor/test-with-playwright'

export const openSecurity = async (api: TestApi, extensionUri: string, extensionId: string): Promise<void> => {
  await api.Extension.addWebExtension(extensionUri)
  await api.ExtensionDetail.open(extensionId)
  await api.ExtensionDetail.selectTab('Security')
}
