import { boolean } from 'yup'
import { getDatatype } from '../faker'
import { MixedFaker } from './mixed'
import { fakeDedicatedTest, addFaker } from './schema'

import type { BooleanSchema } from 'yup'

export class BooleanFaker extends MixedFaker<BooleanSchema> {
  doFake() {
    return getDatatype().boolean()
  }
}

export const installBooleanFaker = () => {
  addFaker(boolean, BooleanFaker)

  fakeDedicatedTest(boolean, 'is-value', schema => {
    const isValueTest = schema.tests.find(test => test.OPTIONS?.name === 'is-value')!
    return isValueTest.OPTIONS?.params?.value === 'true'
  })
}
