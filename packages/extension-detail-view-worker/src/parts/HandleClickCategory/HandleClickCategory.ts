import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { openExtensionSearch } from '../OpenExtensionSearch/OpenExtensionSearch.ts'

export const handleClickCategory = async (state: ExtensionDetailState, categoryId: string): Promise<ExtensionDetailState> => {
  if (!categoryId) {
    return state
  }
  const searchValue = `@category:"${categoryId}"`
  await openExtensionSearch(searchValue)
  return state
}
