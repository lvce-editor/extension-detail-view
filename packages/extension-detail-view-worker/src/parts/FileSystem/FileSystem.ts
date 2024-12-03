import * as EncodingType from '../EncodingType/EncodingType.js'
import * as GetFileSystem from '../GetFileSystem/GetFileSystem.js'
import * as GetProtocol from '../GetProtocol/GetProtocol.js'

export const readFile = async (uri, encoding = EncodingType.Utf8) => {
  const protocol = GetProtocol.getProtocol(uri)
  const path = GetProtocol.getPath(protocol, uri)
  const fileSystem = await GetFileSystem.getFileSystem(protocol)
  return fileSystem.readFile(path, encoding)
}
