import { random } from 'faker'
import { MixedFaker } from './mixed'

import type { BooleanSchema } from 'yup'

export class BooleanFaker extends MixedFaker<BooleanSchema> {
  doFake() {
    const isValueTest = this.schema.tests.find(test => test.OPTIONS.name === 'is-value')
    if (isValueTest) return isValueTest.OPTIONS.params?.value === 'true'

    return random.boolean()
  }
}
