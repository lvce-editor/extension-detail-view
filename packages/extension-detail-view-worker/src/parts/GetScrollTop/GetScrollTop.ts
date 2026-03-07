import * as InputName from '../InputName/InputName.ts'

export const getScrollTop = (selectedTab: string, readmeScrollTop: number, changelogScrollTop: number): number => {
  if (selectedTab === InputName.Details) {
    return readmeScrollTop
  }
  if (selectedTab === InputName.Changelog) {
    return changelogScrollTop
  }
  return -1
}
