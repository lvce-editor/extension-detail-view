import * as Icon from '../Icon/Icon.ts'

export const handleIconError = (state: any): any => {
  const { iconSrc } = state
  if (iconSrc === Icon.ExtensionDefaultIcon) {
    return state
  }
  return {
    ...state,
    iconSrc: Icon.ExtensionDefaultIcon,
  }
}
