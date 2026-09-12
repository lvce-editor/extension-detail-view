import { expect, test } from '@jest/globals'
import { PlatformType } from '@lvce-editor/constants'
import { DialogWorker, RendererWorker } from '@lvce-editor/rpc-registry'
import { handleReadmeLinkClick } from '../src/parts/HandleReadmeLinkClick/HandleReadmeLinkClick.ts'

test.each([PlatformType.Web, PlatformType.Electron])('opens links in the simple browser preview on platform %p', async (platform) => {
  using rpc = RendererWorker.registerMockRpc({
    'Layout.showPreview': () => {
      /**/
    },
    'Preferences.get': () => 'simpleBrowser',
    'SimpleBrowser.setUrl': () => {
      /**/
    },
  })
  await handleReadmeLinkClick(false, platform, 'https://example.com')
  expect(rpc.invocations).toEqual([
    ['Preferences.get', 'extensions.linkBrowser'],
    ['Layout.showPreview', 'simple-browser://'],
    ['SimpleBrowser.setUrl', 'https://example.com'],
  ])
})

test.each([undefined, 'external', 'invalid', true])('defaults to the external browser for %p', async (setting) => {
  using rpc = RendererWorker.registerMockRpc({
    'Open.openExternal': () => {
      /**/
    },
    'Preferences.get': () => setting,
  })
  await handleReadmeLinkClick(false, PlatformType.Electron, 'https://example.com')
  expect(rpc.invocations).toEqual([
    ['Preferences.get', 'extensions.linkBrowser'],
    ['Open.openExternal', 'https://example.com'],
  ])
})

test('canceling link protection does not open the simple browser', async () => {
  using rpc = RendererWorker.registerMockRpc({})
  using dialog = DialogWorker.registerMockRpc({ 'ConfirmPrompt.prompt': () => false })
  await handleReadmeLinkClick(true, PlatformType.Web, 'https://example.com')
  expect(dialog.invocations).toHaveLength(1)
  expect(rpc.invocations).toEqual([])
})

test('finishes the click while the preview waits for the extension view to resize', async () => {
  const preview = Promise.withResolvers<void>()
  const navigation = Promise.withResolvers<void>()
  using rpc = RendererWorker.registerMockRpc({
    'Layout.showPreview': () => preview.promise,
    'Preferences.get': () => 'simpleBrowser',
    'SimpleBrowser.setUrl': () => navigation.resolve(),
  })

  await handleReadmeLinkClick(false, PlatformType.Electron, 'https://example.com')
  expect(rpc.invocations).toEqual([
    ['Preferences.get', 'extensions.linkBrowser'],
    ['Layout.showPreview', 'simple-browser://'],
  ])

  preview.resolve()
  await navigation.promise
  expect(rpc.invocations.at(-1)).toEqual(['SimpleBrowser.setUrl', 'https://example.com'])
})
