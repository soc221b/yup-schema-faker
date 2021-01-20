import { date } from 'faker'
import { MixedFaker } from './mixed'

import type { DateSchema } from 'yup'

const MIN = new Date(0).toISOString()
const MAX = new Date((Math.pow(2, 31) - 1) * 1000).toISOString()

export class DateFaker extends MixedFaker<DateSchema> {
  fakeDefault() {
    const defaultDate =
      typeof this.schema.spec.default === 'function' ? this.schema.spec.default() : this.schema.spec.default
    return defaultDate
  }

  doFake() {
    let min = MIN
    let max = MAX
    for (const test of this.schema.describe().tests) {
      if (test.name === 'min') {
        min = test.params!.min as string
      } else if (test.name === 'max') {
        max = test.params!.max as string
      }
    }
    return date.between(min, max)
  }
}
