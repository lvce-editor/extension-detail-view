import * as ExtensionDisplay from '../ExtensionDisplay/ExtensionDisplay.ts'
import * as ExtensionManagement from '../ExtensionManagement/ExtensionManagement.ts'
import * as GetBaseUrl from '../GetBaseUrl/GetBaseUrl.ts'
import * as GetViewletSize from '../GetViewletSize/GetViewletSize.ts'
import * as GetExtensionReadme from '../LoadReadmeContent/LoadReadmeContent.ts'
import * as MarkDown from '../RenderMarkdown/RenderMarkdown.ts'

export const loadContent = async (state: any, platform: number) => {
  const { uri, width } = state
  const id = uri.slice('extension-detail://'.length)
  const extension = await ExtensionManagement.getExtension(id)
  const readmeContent = await GetExtensionReadme.loadReadmeContent(extension.path)
  // @ts-ignore
  const baseUrl = GetBaseUrl.getBaseUrl(extension.path, platform)
  const readmeHtml = await MarkDown.renderMarkdown(readmeContent)
  const sanitizedReadmeHtml = readmeHtml
  const normalizedReadmeHtml = sanitizedReadmeHtml
  const iconSrc = ExtensionDisplay.getIcon(extension)
  const description = ExtensionDisplay.getDescription(extension)
  const name = ExtensionDisplay.getName(extension)
  const size = GetViewletSize.getViewletSize(width)
  return {
    ...state,
    sanitizedReadmeHtml: normalizedReadmeHtml,
    iconSrc,
    name,
    description,
    size,
  }
}
