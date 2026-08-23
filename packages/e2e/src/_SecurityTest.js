// @ts-check

/**
 * @typedef {import('@lvce-editor/test-with-playwright').TestApi} TestApi
 */

/**
 * @param {TestApi} api
 * @param {string} extensionUri
 * @param {string} extensionId
 * @returns {Promise<void>}
 */
export const openSecurity = async (api, extensionUri, extensionId) => {
  await api.Extension.addWebExtension(extensionUri)
  await api.ExtensionDetail.open(extensionId)
  await api.ExtensionDetail.selectFeatures()
  await api.ExtensionDetail.openFeature('Security')
}
