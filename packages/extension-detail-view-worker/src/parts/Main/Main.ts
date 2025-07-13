import { registerAllFeatures } from '../Features/FeatureFactory.ts'
import * as Listen from '../Listen/Listen.ts'

export const main = async (): Promise<void> => {
  registerAllFeatures()
  await Listen.listen()
}
