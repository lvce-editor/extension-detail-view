import { RendererWorker } from '@lvce-editor/rpc-registry'
import { openExternal } from '../OpenExternal/OpenExternal.ts'

export const handleReadmeLinkClick = async (linkProtectionEnabled: boolean, platform: number, href: string): Promise<void> => {
  // TODO what to do about relative links? open them in editor?
  // TODO what to do about mail links?
  if (linkProtectionEnabled) {
    const message = `Do you want to open this external link?\n\n${href}`
    const confirmed = await RendererWorker.confirm(message)
    if (!confirmed) {
      return
    }
  }
  await openExternal(href, platform)
  return
}
