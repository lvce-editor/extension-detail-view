import * as DiffCss from '../DiffCss/DiffCss.ts'
import * as DiffFocus from '../DiffFocus/DiffFocus.ts'
import * as DiffItems from '../DiffItems/DiffItems.ts'
import * as DiffScrollTop from '../DiffScrollTop/DiffScrollTop.ts'
import * as DiffType from '../DiffType/DiffType.ts'

export const modules = [DiffItems.isEqual, DiffFocus.isEqual, DiffScrollTop.isEqual, DiffCss.isEqual]

export const numbers = [DiffType.RenderItems, DiffType.RenderFocus, DiffType.RenderScrollTop, DiffType.RenderCss]
