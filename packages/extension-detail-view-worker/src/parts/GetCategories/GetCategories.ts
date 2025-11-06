import type { Category } from '../Category/Category.ts'
import { hasProperty } from '../HasProperty/HasProperty.ts'

const stringifyCategory = (category: unknown): string => {
  if (typeof category === 'string') {
    return category
  }
  return JSON.stringify(category)
}

const toCategory = (categoryString: string): Category => {
  return {
    id: categoryString.toLowerCase(),
    label: categoryString,
  }
}

export const getCategories = (extension: unknown): readonly Category[] => {
  if (!hasProperty(extension, 'categories') || !Array.isArray(extension.categories)) {
    return []
  }
  const categoryStrings = extension.categories.map(stringifyCategory)
  const categories = categoryStrings.map(toCategory)
  return categories
}
