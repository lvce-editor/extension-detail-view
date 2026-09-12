import { cp } from 'node:fs/promises'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { root } from './root.ts'

const main = async (): Promise<void> => {
  const sharedProcessPath = join(root, 'node_modules', '@lvce-editor', 'shared-process', 'index.js')

  const sharedProcessUrl = pathToFileURL(sharedProcessPath).toString()

  const sharedProcess = await import(sharedProcessUrl)

  process.env.PATH_PREFIX = '/extension-detail-view'
  const { commitHash } = await sharedProcess.exportStatic({
    root,
    extensionPath: '',
    testPath: 'packages/e2e',
  })

  const workerPath = join(root, '.tmp/dist/dist/extensionDetailViewWorkerMain.js')

  const extensionDetailViewWorkerPath = join(
    root,
    'dist',
    commitHash,
    'packages',
    'extension-detail-view-worker',
    'dist',
    'extensionDetailViewWorkerMain.js',
  )
  await cp(workerPath, extensionDetailViewWorkerPath)

  await cp(join(root, 'dist'), join(root, '.tmp', 'static'), { recursive: true })
}

main()
