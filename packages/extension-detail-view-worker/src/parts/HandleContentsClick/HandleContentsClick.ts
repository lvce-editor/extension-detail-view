import { DirentType } from '@lvce-editor/constants'
import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import * as FileSystem from '../FileSystem/FileSystem.ts'
import * as InputName from '../InputName/InputName.ts'
import * as LoadContentDirectory from '../LoadContentDirectory/LoadContentDirectory.ts'

const isDirectory = (type: number): boolean => type === DirentType.Directory || type === DirentType.DirectoryExpanded

const collapseDirectory = (state: ExtensionDetailState, uri: string): ExtensionDetailState => {
  const { contentEntries, contentExpandedUris } = state
  const entry = contentEntries.find((contentEntry) => contentEntry.uri === uri)
  if (!entry) {
    return state
  }
  const index = contentEntries.indexOf(entry)
  const remainingEntries = [
    ...contentEntries.slice(0, index + 1),
    ...contentEntries.slice(index + 1).filter((contentEntry) => contentEntry.depth <= entry.depth),
  ]
  return {
    ...state,
    contentEntries: remainingEntries,
    contentExpandedUris: contentExpandedUris.filter((expandedUri) => expandedUri !== uri),
  }
}

const expandDirectory = async (state: ExtensionDetailState, uri: string): Promise<ExtensionDetailState> => {
  const { contentEntries, contentExpandedUris } = state
  const entry = contentEntries.find((contentEntry) => contentEntry.uri === uri)
  if (!entry) {
    return state
  }
  try {
    const children = await LoadContentDirectory.loadContentDirectory(uri, entry.depth + 1)
    const index = contentEntries.indexOf(entry)
    const updatedContentEntries = [...contentEntries.slice(0, index + 1), ...children, ...contentEntries.slice(index + 1)]
    return {
      ...state,
      contentEntries: updatedContentEntries,
      contentError: '',
      contentExpandedUris: [...contentExpandedUris, uri],
    }
  } catch (error) {
    return {
      ...state,
      contentError: String(error),
    }
  }
}

const selectFile = async (state: ExtensionDetailState, uri: string): Promise<ExtensionDetailState> => {
  try {
    const content = await FileSystem.readFile(uri)
    return {
      ...state,
      contentError: '',
      contentFileContent: content,
      contentSelectedUri: uri,
      selectedTab: InputName.Contents,
    }
  } catch (error) {
    return {
      ...state,
      contentError: String(error),
      contentFileContent: '',
      contentSelectedUri: uri,
      selectedTab: InputName.Contents,
    }
  }
}

export const handleContentsClick = async (state: ExtensionDetailState, uri: string): Promise<ExtensionDetailState> => {
  const { contentEntries, contentExpandedUris } = state
  const entry = contentEntries.find((contentEntry) => contentEntry.uri === uri)
  if (!entry) {
    return state
  }
  if (isDirectory(entry.type)) {
    return contentExpandedUris.includes(uri) ? collapseDirectory(state, uri) : expandDirectory(state, uri)
  }
  return selectFile(state, uri)
}
