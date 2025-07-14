import type { Category } from '../Category/Category.ts'

export const getCategories = (): readonly Category[] => {
  // TODO
  return [
    {
      id: 'themes',
      label: 'Themes',
    },
  ]
}
