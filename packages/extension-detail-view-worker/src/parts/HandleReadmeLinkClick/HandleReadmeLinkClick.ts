import { DialogWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import * as Logger from '../Logger/Logger.ts'
import { openExternal } from '../OpenExternal/OpenExternal.ts'

const openSimpleBrowser = async (href: string): Promise<void> => {
  await RendererWorker.invoke('Layout.showPreview', 'simple-browser://')
  await RendererWorker.invoke('SimpleBrowser.setUrl', href)
}

export const handleReadmeLinkClick = async (linkProtectionEnabled: boolean, platform: number, href: string): Promise<void> => {
  // TODO what to do about relative links? open them in editor?
  // TODO what to do about mail links?
  if (linkProtectionEnabled) {
    const message = `Do you want to open this external link?\n\n${href}`
    const confirmed = await DialogWorker.invoke('ConfirmPrompt.prompt', message)
    if (!confirmed) {
      return
    }
  }
  const browser = await RendererWorker.getPreference('extensions.linkBrowser')
  if (browser === 'simpleBrowser') {
    // Showing the preview resizes this view. Let the click finish so the resize can run.
    void openSimpleBrowser(href).catch(Logger.error)
    return
  }
  await openExternal(href, platform)
}
