import { mixed } from 'yup'
import { random } from 'faker'
import { MixedFaker } from './mixed'

import type { AnySchema, ArraySchema } from 'yup'
import type { Options } from '../type'

export class ArrayFaker extends MixedFaker<ArraySchema<AnySchema>> {
  doFake(options?: Options) {
    let min: number = 0
    let max: number | undefined = undefined
    for (const test of this.schema.describe().tests) {
      switch (test.name) {
        case 'min':
          min = test.params!.min as number
          break
        case 'max':
          max = test.params!.max as number
          break
      }
    }
    for (const test of this.schema.describe().tests) {
      switch (test.name) {
        case 'length':
          min = test.params!.length as number
          max = test.params!.length as number
          break
      }
    }

    if (max === undefined) {
      max = min + 10
    }

    const innerSchema = this.schema.innerType
    if (innerSchema) {
      return Array(random.number({ min, max }))
        .fill(null)
        .map(() => ArrayFaker.rootFake(this.schema.innerType!, options))
    } else {
      return Array(random.number({ min, max }))
        .fill(null)
        .map(() => ArrayFaker.rootFake(mixed(), options))
    }
  }
}
