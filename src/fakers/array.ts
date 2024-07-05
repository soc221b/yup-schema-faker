import { mixed, array } from 'yup'
import { getFaker } from '../faker'
import { MixedFaker } from './mixed'
import { addFaker, globalOptions } from './base'

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

    let array = Array(getFaker().number.int({ min, max })).fill(null)
    const innerSchema = this.schema.innerType
    if (innerSchema) {
      array = array.map(() => ArrayFaker.rootFake(this.schema.innerType!, options))
    } else {
      array = array.map(() => ArrayFaker.rootFake(mixed(), options))
    }

    if (
      (this.schema.spec.strict || globalOptions.strict) !== true &&
      getFaker().number.float({ min: 0, max: 1 }) > 0.9
    ) {
      return JSON.stringify(array)
    }

    return array
  }
}

export const installArrayFaker = () => {
  addFaker(array, ArrayFaker)
}
