import { mixed, array } from 'yup'
import { datatype } from 'faker'
import { MixedFaker } from './mixed'
import { addFaker } from './base'

import type { AnySchema, ArraySchema } from 'yup'
import type { Options } from '../type'

export class ArrayFaker extends MixedFaker<ArraySchema<AnySchema>> {
  doFake(options?: Options) {
    const min =
      ((this.schema.tests.find(test => test.OPTIONS.name === 'length')?.OPTIONS.params?.length as number) ||
        undefined) ??
      ((this.schema.tests.find(test => test.OPTIONS.name === 'min')?.OPTIONS.params?.min as number) || undefined) ??
      0
    const max =
      ((this.schema.tests.find(test => test.OPTIONS.name === 'length')?.OPTIONS.params?.length as number) ||
        undefined) ??
      ((this.schema.tests.find(test => test.OPTIONS.name === 'max')?.OPTIONS.params?.max as number) || undefined) ??
      min + 10

    const array = Array(datatype.number({ min, max })).fill(null)
    const innerSchema = this.schema.innerType
    if (innerSchema) {
      return array.map(() => ArrayFaker.rootFake(this.schema.innerType!, options))
    } else {
      return array.map(() => ArrayFaker.rootFake(mixed(), options))
    }
  }
}

addFaker(array, ArrayFaker)
