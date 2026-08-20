import { readFile, readdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

const __dirname = import.meta.dirname

const root = join(__dirname, '..', '..', '..')

export const getRemoteUrl = (path) => {
  const url = pathToFileURL(path).toString().slice(8)
  return `/remote/${url}`
}

const nodeModulesPath = join(root, 'node_modules')

const workerPath = join(root, '.tmp', 'dist', 'dist', 'extensionDetailViewWorkerMain.js')

const serverStaticPath = join(nodeModulesPath, '@lvce-editor', 'static-server', 'static')

const RE_COMMIT_HASH = /^[a-z\d]+$/
const isCommitHash = (dirent) => {
  return dirent.length === 7 && dirent.match(RE_COMMIT_HASH)
}

const dirents = await readdir(serverStaticPath)
const commitHash = dirents.find(isCommitHash) || ''
const rendererWorkerMainPath = join(serverStaticPath, commitHash, 'packages', 'renderer-worker', 'dist', 'rendererWorkerMain.js')

const content = await readFile(rendererWorkerMainPath, 'utf-8')

const remoteUrl = getRemoteUrl(workerPath)
if (!content.includes('// const extensionDetailViewWorkerUrl = ')) {
  const occurrence = `const extensionDetailViewWorkerUrl = \`\${assetDir}/packages/extension-detail-view-worker/dist/extensionDetailViewWorkerMain.js\``
  const replacement = `// const extensionDetailViewWorkerUrl = \`\${assetDir}/packages/extension-detail-view-worker/dist/extensionDetailViewWorkerMain.js\`
const extensionDetailViewWorkerUrl = \`${remoteUrl}\``

  const newContent = content.replace(occurrence, replacement)
  await writeFile(rendererWorkerMainPath, newContent)
}

const replaceOnce = (content, occurrence, replacement, label) => {
  const index = content.indexOf(occurrence)
  if (index === -1) {
    throw new Error(`${label} occurrence not found`)
  }
  if (content.indexOf(occurrence, index + occurrence.length) !== -1) {
    throw new Error(`${label} occurrence is not unique`)
  }
  return content.replace(occurrence, replacement)
}

if (!process.env.SKIP_TRACE_PATCH) {
  let rendererWorkerContent = await readFile(rendererWorkerMainPath, 'utf8')
  rendererWorkerContent = replaceOnce(
    rendererWorkerContent,
    `const getOptions = async () => {
  state$d.optionsPromise ||= Promise.resolve(state$d.getArgv()).then(argv => {
    const options = parseTraceIpc(argv);
    if (options.error) {
      reportError(new Error(options.error));
    }
    return options;
  }).catch(error => {
    reportError(error);
    return {
      error: '',
      selectors: new Set()
    };
  });
  return state$d.optionsPromise;
};`,
    `const getOptions = async () => ({
  error: '',
  selectors: new Set(['*'])
});`,
    'trace all worker IPC',
  )
  rendererWorkerContent = replaceOnce(
    rendererWorkerContent,
    `const RE_HTML = /\\.html$/;
const getUrlBaseName = href => {
  const fileName = href.slice(href.lastIndexOf('/') + 1);
  const baseName = fileName.replace(RE_HTML, '');
  return baseName;
};`,
    `const RE_HTML = /\\.html$/;
const getUrlBaseName = href => {
  const url = new URL(href);
  const fileName = url.pathname.slice(url.pathname.lastIndexOf('/') + 1);
  const baseName = fileName.replace(RE_HTML, '');
  return baseName;
};`,
    'trace query test URL handling',
  )
  await writeFile(rendererWorkerMainPath, rendererWorkerContent)

  const rendererProcessMainPath = join(serverStaticPath, commitHash, 'packages', 'renderer-process', 'dist', 'rendererProcessMain.js')
  let rendererProcessContent = await readFile(rendererProcessMainPath, 'utf8')
  rendererProcessContent = replaceOnce(
    rendererProcessContent,
    `  if (rpcId !== undefined) {
    registerRpc(rpcId, rpc);
  }`,
    `  listen(rpc);
  if (rpcId !== undefined) {
    registerRpc(rpcId, rpc);
  }`,
    'direct RPC trace listener',
  )
  rendererProcessContent = replaceOnce(
    rendererProcessContent,
    `    if (rpc) {
      rpc.send(method, uid, ...args);
      return;
    }`,
    `    if (rpc) {
      record('sent', method, [uid, ...args]);
      rpc.send(method, uid, ...args);
      return;
    }`,
    'direct RPC send trace',
  )
  rendererProcessContent = replaceOnce(
    rendererProcessContent,
    `const scheduleExport = () => {`,
    `globalThis.___exportRendererWorkerTrace = exportToDom;
const scheduleExport = () => {`,
    'renderer trace export hook',
  )
  await writeFile(rendererProcessMainPath, rendererProcessContent)

  const testWithPlaywrightWorkerPath = join(nodeModulesPath, '@lvce-editor', 'test-with-playwright-worker', 'dist', 'workerMain.js')
  const testWithPlaywrightWorkerContent = await readFile(testWithPlaywrightWorkerPath, 'utf8')
  const newTestWithPlaywrightWorkerContent = replaceOnce(
    testWithPlaywrightWorkerContent,
    `    text = await page.evaluate(traceSelector => {
      return globalThis.document.querySelector(traceSelector)?.textContent || undefined;
    }, selector);`,
    `    text = await page.evaluate(traceSelector => {
      globalThis.___exportRendererWorkerTrace?.();
      return globalThis.document.querySelector(traceSelector)?.textContent || undefined;
    }, selector);`,
    'renderer trace export request',
  )
  await writeFile(testWithPlaywrightWorkerPath, newTestWithPlaywrightWorkerContent)
}
