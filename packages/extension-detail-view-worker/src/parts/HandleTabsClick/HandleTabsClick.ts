export const handleTabsClick = (state: any, name: string): any => {
  // TODO load the tabs content if needed
  console.log({ name })
  return {
    ...state,
    selectedTab: name,
  }
}
