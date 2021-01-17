import { random } from 'faker'
import { MixedFaker } from './mixed'

import type { BooleanSchema } from 'yup'

export class BooleanFaker extends MixedFaker<BooleanSchema> {
  doFake() {
    const isValue = this.schema.describe().tests.find(test => test.name === 'is-value')
    if (isValue !== undefined) {
      return isValue.params!.value === 'true'
    }
    return random.boolean()
  }
}
