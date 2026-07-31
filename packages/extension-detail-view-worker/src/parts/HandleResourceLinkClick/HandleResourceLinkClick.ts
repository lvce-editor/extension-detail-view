import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { getOpenUri } from '../GetOpenUri/GetOpenUri.ts'
import { handleReadmeLinkClick } from '../HandleReadmeLinkClick/HandleReadmeLinkClick.ts'
import * as Path from '../Path/Path.ts'

const isExternalLink = (href: string): boolean => {
  return href.startsWith('http://') || href.startsWith('https://')
}

export const handleResourceLinkClick = async (state: ExtensionDetailState, href: string, themePath: string = ''): Promise<ExtensionDetailState> => {
  if (themePath) {
    const { extensionUri } = state
    const themeUri = getOpenUri(Path.join(extensionUri, themePath))
    // Opening another main-area view hides this one, so waiting here would deadlock the renderer.
    void RendererWorker.invoke('Main.openUri', themeUri)
    return state
  }
  const { linkProtectionEnabled, platform } = state
  if (!href || !isExternalLink(href)) {
    return state
  }
  await handleReadmeLinkClick(linkProtectionEnabled, platform, href)
  return state
}
