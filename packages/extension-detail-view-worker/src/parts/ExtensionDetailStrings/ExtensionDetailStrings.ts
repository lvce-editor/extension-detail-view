import * as I18nString from '../I18nString/I18nString.ts'
import * as UiStrings from '../UiStrings/UiStrings.ts'

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

export const fileMatch = (): string => {
  return I18nString.i18nString(UiStrings.FileMatch)
}

export const schema = (): string => {
  return I18nString.i18nString(UiStrings.Schema)
}
