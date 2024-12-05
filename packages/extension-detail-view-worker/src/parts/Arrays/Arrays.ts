export const toSorted = <T>(array: readonly T[], compare: any): readonly T[] => {
  return [...array].sort(compare)
}
