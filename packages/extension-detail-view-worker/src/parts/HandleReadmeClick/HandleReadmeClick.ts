import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

const isExternalLink = (href: string): boolean => {
  return href.startsWith('http://') || href.startsWith('https://')
}

export const handleReadmeClick = async (state: ExtensionDetailState, nodeName: string, href: string): Promise<ExtensionDetailState> => {
  const { linkProtectionEnabled } = state
  if (!href || !isExternalLink(href)) {
    return state
  }
  // TODO what to do about relative links? open them in editor?
  // TODO what to do about mail links?
  if (linkProtectionEnabled) {
    const message = `Do you want to open this external link?\n\n${href}`
    const confirmed = await RendererWorker.confirm(message)
    if (!confirmed) {
      return state
    }
  }
  await RendererWorker.openUrl(href)
  // TODO check node name and href
  return state
}
