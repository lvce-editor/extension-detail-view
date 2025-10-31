import { RendererWorker } from '@lvce-editor/rpc-registry'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'

const isExternalLink = (href: string): boolean => {
  return href.startsWith('http://') || href.startsWith('https://')
}

export const handleReadmeClick = async (state: ExtensionDetailState, nodeName: string, href: string): Promise<ExtensionDetailState> => {
  if (!href || !isExternalLink(href)) {
    return state
  }
  // TODO what to do about relative links? open them in editor?
  // TODO what to do about mail links?
  await RendererWorker.openUrl(href)
  // TODO check node name and href
  return state
}
