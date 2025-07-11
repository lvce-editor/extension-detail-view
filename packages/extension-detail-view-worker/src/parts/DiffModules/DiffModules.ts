import * as DiffFocus from '../DiffFocus/DiffFocus.ts'
import * as DiffItems from '../DiffItems/DiffItems.ts'
import * as DiffScrollTop from '../DiffScrollTop/DiffScrollTop.ts'

export const modules = [DiffItems.isEqual, DiffFocus.isEqual, DiffScrollTop.isEqual]

export const numbers = [DiffItems.diffType, DiffFocus.diffType, DiffScrollTop.diffType]
