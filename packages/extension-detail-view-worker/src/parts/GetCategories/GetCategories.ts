import type { Category } from '../Category/Category.ts'
import { hasProperty } from '../HasProperty/HasProperty.ts'

export const getCategories = (extension: unknown): readonly Category[] => {
  if (!hasProperty(extension, 'categories') || !Array.isArray(extension.categories)) {
    return []
  }
  const categoryStrings = extension.categories.filter((item) => typeof item === 'string')
  const categories = categoryStrings.map((categoryString) => {
    return {
      id: categoryString.toLowerCase(),
      label: categoryString,
    }
  })
  return categories
}
