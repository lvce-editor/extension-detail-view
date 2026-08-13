import { readFile, readdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = import.meta.dirname

const root = join(__dirname, '..', '..', '..')

export const getRemoteUrl = (path) => {
  const url = pathToFileURL(path).toString().slice(8)
  return `/remote/${url}`
}

const nodeModulesPath = join(root, 'node_modules')

const workerPath = join(root, '.tmp', 'dist', 'dist', 'extensionDetailViewWorkerMain.js')

const serverStaticPath = join(__dirname, '..', 'node_modules', '@lvce-editor', 'static-server', 'static')

const markdownWorkerPath = fileURLToPath(import.meta.resolve('@lvce-editor/markdown-worker'))

const RE_COMMIT_HASH = /^[a-z\d]+$/
const isCommitHash = (dirent) => {
  return dirent.length === 7 && dirent.match(RE_COMMIT_HASH)
}

const dirents = await readdir(serverStaticPath)
const commitHash = dirents.find(isCommitHash) || ''
const serverMarkdownWorkerPath = join(serverStaticPath, commitHash, 'packages', 'markdown-worker', 'dist', 'markdownWorkerMain.js')
const rendererWorkerMainPath = join(serverStaticPath, commitHash, 'packages', 'renderer-worker', 'dist', 'rendererWorkerMain.js')

await writeFile(serverMarkdownWorkerPath, await readFile(markdownWorkerPath))

const content = await readFile(rendererWorkerMainPath, 'utf-8')

const remoteUrl = getRemoteUrl(workerPath)
if (!content.includes('// const extensionDetailViewWorkerUrl = ')) {
  const occurrence = `const extensionDetailViewWorkerUrl = \`\${assetDir}/packages/extension-detail-view-worker/dist/extensionDetailViewWorkerMain.js\``
  const replacement = `// const extensionDetailViewWorkerUrl = \`\${assetDir}/packages/extension-detail-view-worker/dist/extensionDetailViewWorkerMain.js\`
const extensionDetailViewWorkerUrl = \`${remoteUrl}\``

  const newContent = content.replace(occurrence, replacement)
  await writeFile(rendererWorkerMainPath, newContent)
}
