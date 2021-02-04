import { boolean } from 'yup'
import { random } from 'faker'
import { MixedFaker } from './mixed'

import type { BooleanSchema } from 'yup'
import { fakeDedicatedTest } from './base'

export class BooleanFaker extends MixedFaker<BooleanSchema> {
  doFake() {
    return random.boolean()
  }
}

fakeDedicatedTest(boolean, 'is-value', schema => {
  const isValueTest = schema.tests.find(test => test.OPTIONS.name === 'is-value')!
  return isValueTest.OPTIONS.params?.value === 'true'
})
