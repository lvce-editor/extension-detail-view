import { readFile, writeFile } from 'node:fs/promises'

// Temporary diagnostic patch for the exact Electron artifact used by this PR.
const path = process.argv[2]
let source = await readFile(path, 'utf8')
const replaceOnce = (before, after) => {
  if (source.split(before).length !== 2) {
    throw new Error(`Expected exactly one startup trace target: ${before}`)
  }
  source = source.replace(before, after)
}

const prelude = `
const startupTrace = globalThis.__startupTrace = { entries: [], dropped: 0 };
const startupChannels = new WeakMap();
let startupChannelId = 0;
const traceStartup = (stage, ipc, message = {}) => {
  if (startupTrace.entries.length >= 500) { startupTrace.dropped++; return; }
  if (ipc && !startupChannels.has(ipc)) startupChannels.set(ipc, ++startupChannelId);
  startupTrace.entries.push({ sequence: startupTrace.entries.length, at: performance.now(), stage,
    channel: ipc ? startupChannels.get(ipc) : undefined, id: message?.id, method: message?.method,
    error: message?.error ? String(message.error.stack || message.error.message || message.error).slice(0, 2000) : undefined,
    main: !!document.querySelector('.Main'), bodyChildren: document.body?.childElementCount });
};
traceStartup('module-start');
new MutationObserver(() => traceStartup('dom-mutation')).observe(document.documentElement, { childList: true, subtree: true });
`
replaceOnce('const main = async () => {', "const main = async () => {\n  traceStartup('main-start');")
replaceOnce(
  'const launchWorkersResult = await launchWorkers();',
  "const launchWorkersResult = await launchWorkers();\n  traceStartup('launch-workers-result', undefined, { error: launchWorkersResult.error });",
)
replaceOnce('  setIpc(ViewletEventRouter);', "  setIpc(ViewletEventRouter);\n  traceStartup('main-complete');")
replaceOnce('const handleMessage = event => {', "const handleMessage = event => {\n  traceStartup('receive', event.target, event.data);")
replaceOnce(
  '  const message = create$H(id, method, params);',
  "  const message = create$H(id, method, params);\n  traceStartup('invoke', ipc, message);",
)
replaceOnce(
  '      const message = create$I(method, params);',
  "      const message = create$I(method, params);\n      traceStartup('send', ipc, message);",
)
replaceOnce('      try {\n        ipc.send(response);', "      traceStartup('response', ipc, response);\n      try {\n        ipc.send(response);")
replaceOnce(
  "const handleError = async (error, notify = true, prefix = '') => {",
  "const handleError = async (error, notify = true, prefix = '') => {\n  traceStartup('handle-error', undefined, { error });",
)
await writeFile(path, prelude + source)
console.log(`Installed bounded startup trace in ${path}`)
