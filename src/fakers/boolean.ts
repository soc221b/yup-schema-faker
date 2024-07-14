import { boolean } from 'yup'
import { getFaker } from '../faker'
import { fakeDedicatedTest, addFaker, SchemaFaker } from './schema'

import type { BooleanSchema } from 'yup'

export class BooleanFaker extends SchemaFaker<BooleanSchema> {
  doFake() {
    return getFaker().datatype.boolean()
  }
}

export const installBooleanFaker = () => {
  addFaker(boolean, BooleanFaker)

  fakeDedicatedTest(boolean, 'is-value', schema => {
    const isValueTest = schema.tests.find(test => test.OPTIONS?.name === 'is-value')!
    return isValueTest.OPTIONS?.params?.value === 'true'
  })
}
