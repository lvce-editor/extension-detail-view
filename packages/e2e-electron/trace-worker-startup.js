import { readFile, writeFile } from 'node:fs/promises'

const path = process.argv[2]
let source = await readFile(path, 'utf8')
const replace = (before, after, count = 1) => {
  if (source.split(before).length !== count + 1) {
    throw new Error(`Unexpected worker startup trace target count: ${before}`)
  }
  source = source.replaceAll(before, after)
}
const prelude = `
const startupTrace = { entries: [], dropped: 0 };
const startupChannels = new WeakMap();
let startupChannelId = 0;
const traceStartup = (stage, ipc, message = {}) => {
  if (startupTrace.entries.length >= 1000) { startupTrace.dropped++; return; }
  if (ipc && !startupChannels.has(ipc)) startupChannels.set(ipc, ++startupChannelId);
  startupTrace.entries.push({ sequence: startupTrace.entries.length, at: performance.now(), stage,
    channel: ipc ? startupChannels.get(ipc) : undefined, id: message?.id, method: message?.method,
    error: message?.error ? String(message.error.stack || message.error.message || message.error).slice(0, 2000) : undefined });
};
`
replace('const commandMap = {', "const commandMap = {\n  'Diagnostics.getStartupTrace': () => startupTrace,")
replace('const mark = id => {', "const mark = id => {\n  traceStartup('mark', undefined, { method: id });")
replace('const handleMessage = event => {', "const handleMessage = event => {\n  traceStartup('receive', event.target, event.data);")
replace('  } = create$2$1(method, params);', "  } = create$2$1(method, params);\n  traceStartup('invoke', ipc, message);")
replace(
  '  const message = create$n$1(id, method, params);',
  "  const message = create$n$1(id, method, params);\n  traceStartup('invoke', ipc, message);",
)
replace(
  '  const responseMessage = await promise;',
  "  const responseMessage = await promise;\n  traceStartup('invoke-response', ipc, responseMessage);",
  2,
)
await writeFile(path, prelude + source)
console.log(`Installed bounded worker startup trace in ${path}`)
