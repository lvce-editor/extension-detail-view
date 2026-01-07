import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { handleReadmeLinkClick } from '../HandleReadmeLinkClick/HandleReadmeLinkClick.ts'

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
  await handleReadmeLinkClick(linkProtectionEnabled, href)
  return state
}
