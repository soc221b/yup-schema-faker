import { boolean } from 'yup'
import { random } from 'faker'
import { MixedFaker } from './mixed'
import { fakeDedicatedTest, addFaker } from './base'

import type { BooleanSchema } from 'yup'

export class BooleanFaker extends MixedFaker<BooleanSchema> {
  doFake() {
    return random.boolean()
  }
}

addFaker(boolean, BooleanFaker)

fakeDedicatedTest(boolean, 'is-value', schema => {
  const isValueTest = schema.tests.find(test => test.OPTIONS.name === 'is-value')!
  return isValueTest.OPTIONS.params?.value === 'true'
})
