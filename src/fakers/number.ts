import { random } from 'faker'
import { MixedFaker } from './mixed'

import type { NumberSchema } from 'yup'

export class NumberFaker extends MixedFaker<NumberSchema> {
  doFake() {
    let min: number = -Number.MAX_SAFE_INTEGER
    let max: number = Number.MAX_SAFE_INTEGER
    let integer: boolean | undefined = undefined
    for (const test of this.schema.tests) {
      switch (test.OPTIONS.name) {
        case 'min':
          if (typeof test.OPTIONS.params!.min === 'number') {
            min = Math.max(min, test.OPTIONS.params!.min)
          }
          if (typeof test.OPTIONS.params!.more === 'number') {
            // TODO: custom precision
            min = Math.max(min, test.OPTIONS.params!.more + 1e-2)
          }
          break
        case 'max':
          if (typeof test.OPTIONS.params!.max === 'number') {
            max = Math.min(max, test.OPTIONS.params!.max)
          }
          if (typeof test.OPTIONS.params!.less === 'number') {
            // TODO: custom precision
            max = Math.min(max, test.OPTIONS.params!.less - 1e-2)
          }
          break
        case 'integer':
          integer = true
          break
        default:
          break
      }
    }

    if (integer) {
      min = Math.ceil(min)
      max = Math.floor(max)
    }

    let result = random.float({
      min,
      max,
    })

    if (integer) {
      result = Math.round(result)
    }

    return result
  }
}
