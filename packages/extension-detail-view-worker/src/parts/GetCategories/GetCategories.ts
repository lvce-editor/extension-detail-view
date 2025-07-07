import type { Category } from '../Category/Category.ts'

export const getCategories = (): readonly Category[] => {
  return [
    {
      id: 'themes',
      label: 'Themes',
    },
  ]
}
