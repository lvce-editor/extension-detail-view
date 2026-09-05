import { getComponentState } from '../GetComponentState/GetComponentState.ts'
import { renderDom } from '../RenderDom/RenderDom.ts'

export const getComponentDom = (uid: number): readonly any[] => {
  const state = getComponentState(uid)
  return renderDom(state, state)[2]
}
