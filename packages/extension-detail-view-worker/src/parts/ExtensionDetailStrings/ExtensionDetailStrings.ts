import * as I18nString from '../I18nString/I18nString.ts'

const UiStrings = {
  Copy: 'Copy',
  OpenInNewTab: 'Open in New Tab',
  OpenImageInNewTab: 'Open Image in New Tab',
  SaveImageAs: 'Save Image as',
}

export const copy = (): string => {
  return I18nString.i18nString(UiStrings.Copy)
}

export const openInNewTab = (): string => {
  return I18nString.i18nString(UiStrings.OpenInNewTab)
}

export const openImageInNewTab = (): string => {
  return I18nString.i18nString(UiStrings.OpenImageInNewTab)
}

export const saveImageAs = (): string => {
  return I18nString.i18nString(UiStrings.SaveImageAs)
}
