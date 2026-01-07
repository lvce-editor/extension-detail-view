import { RendererWorker } from '@lvce-editor/rpc-registry'

export const handleReadmeLinkClick = async (linkProtectionEnabled: boolean, href: string): Promise<void> => {
  // TODO what to do about relative links? open them in editor?
  // TODO what to do about mail links?
  if (linkProtectionEnabled) {
    const message = `Do you want to open this external link?\n\n${href}`
    const confirmed = await RendererWorker.confirm(message)
    if (!confirmed) {
      return
    }
  }
  await RendererWorker.openUrl(href)
  // TODO check node name and href
  return
}
