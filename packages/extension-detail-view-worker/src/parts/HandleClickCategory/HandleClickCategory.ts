import type { ExtensionDetailState } from '../ExtensionDetailState/ExtensionDetailState.ts'
import { getCategorySearchValue } from '../GetCategorySearchValue/GetCategorySearchValue.ts'
import { openExtensionSearch } from '../OpenExtensionSearch/OpenExtensionSearch.ts'

export const handleClickCategory = async (state: ExtensionDetailState, categoryId: string): Promise<ExtensionDetailState> => {
  if (!categoryId) {
    return state
  }
  const searchValue = getCategorySearchValue(categoryId)
  await openExtensionSearch(searchValue)
  return state
}
