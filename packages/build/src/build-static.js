import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { root } from './root.js'
import { cp } from 'node:fs/promises'

const sharedProcessPath = join(root, 'packages', 'server', 'node_modules', '@lvce-editor', 'shared-process', 'index.js')

const sharedProcessUrl = pathToFileURL(sharedProcessPath).toString()

const sharedProcess = await import(sharedProcessUrl)

process.env.PATH_PREFIX = '/extension-detail-view'
const { commitHash } = await sharedProcess.exportStatic({
  root,
  extensionPath: '',
})

await cp(
  join(root, '.tmp', 'dist', 'dist', 'extensionDetailViewWorkerMain.js'),
  join(root, 'dist', commitHash, 'packages', 'extension-detail-view-worker', 'dist', 'extensionDetailViewWorkerMain.js'),
)

await cp(join(root, 'dist'), join(root, '.tmp', 'static'), { recursive: true })