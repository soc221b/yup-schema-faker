import { date as yupDate } from 'yup'
import { date } from 'faker'
import { datatype } from '../faker'
import { MixedFaker } from './mixed'
import { addFaker } from './base'

import type { DateSchema } from 'yup'

const MIN = new Date(0).toISOString()
const MAX = new Date((Math.pow(2, 31) - 1) * 1000).toISOString()

export class DateFaker extends MixedFaker<DateSchema> {
  doFake() {
    const min =
      (this.schema.tests.find(test => test.OPTIONS.name === 'min')?.OPTIONS.params?.min as Date | undefined) ?? MIN
    const max =
      (this.schema.tests.find(test => test.OPTIONS.name === 'max')?.OPTIONS.params?.max as Date | undefined) ?? MAX

    const result = date.between(min, max)

    if (this.schema.spec.strict !== true && datatype.float({ min: 0, max: 1 }) > 0.8) {
      return result.toISOString()
    }

    return result
  }
}

addFaker(yupDate, DateFaker)
