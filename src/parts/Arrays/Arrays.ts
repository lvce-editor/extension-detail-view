export const toSorted = (array: readonly any[], compare: any): any[] => {
  return [...array].sort(compare)
}
