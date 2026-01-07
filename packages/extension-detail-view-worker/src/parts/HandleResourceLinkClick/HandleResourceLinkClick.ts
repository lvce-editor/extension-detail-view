import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { handleReadmeLinkClick } from '../HandleReadmeLinkClick/HandleReadmeLinkClick.ts'

const isExternalLink = (href: string): boolean => {
  return href.startsWith('http://') || href.startsWith('https://')
}

export const handleResourceLinkClick = async (state: ExtensionDetailState, href: string): Promise<ExtensionDetailState> => {
  const { linkProtectionEnabled, platform } = state
  if (!href || !isExternalLink(href)) {
    return state
  }
  await handleReadmeLinkClick(linkProtectionEnabled, platform, href)
  return state
}
