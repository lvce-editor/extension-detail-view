import * as FeatureFactory from '../FeatureFactory/FeatureFactory.ts'
import * as Listen from '../Listen/Listen.ts'

export const main = async (): Promise<void> => {
  FeatureFactory.registerAllFeatures()
  await Listen.listen()
}
