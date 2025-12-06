import type { Test } from '@lvce-editor/test-with-playwright'

export const test: Test = async ({ expect, Locator, SideBar }) => {
  // arrange
  await SideBar.open('Extensions')

  // act
  const first = Locator('.ExtensionListItem[aria-posinset="1"]')
  await expect(first).toBeVisible()
  // TODO use command api to open detailview
  await first.click({})

  // assert
  // TODO
}
