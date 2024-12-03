import { createWorker } from './createWorker.js'

const workerPath = new URL('../../../.tmp/dist/dist/extensionDetailViewWorkerMain.js', import.meta.url).toString()

const createWrappedRpc = (rpc) => {
  return rpc
}

export const setup = async () => {
  const commandMap = {}
  const rpc = await createWorker(workerPath, commandMap)
  const wrapped = createWrappedRpc(rpc)
  return wrapped
}
