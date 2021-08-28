import { number } from 'yup'
import { datatype } from '../faker'
import { MixedFaker } from './mixed'
import { addFaker, globalOptions } from './base'

import type { NumberSchema } from 'yup'

export class NumberFaker extends MixedFaker<NumberSchema> {
  doFake() {
    let min =
      (this.schema.tests.find(test => test.OPTIONS.name === 'min')?.OPTIONS.params?.min as number | undefined) ??
      Number.MIN_SAFE_INTEGER
    let max =
      (this.schema.tests.find(test => test.OPTIONS.name === 'max')?.OPTIONS.params?.max as number | undefined) ??
      Number.MAX_SAFE_INTEGER

    const more = this.schema.tests.find(test => test.OPTIONS.name === 'min')?.OPTIONS.params?.more as number | undefined
    if (more !== undefined && Number.isFinite(more) && Number.MIN_SAFE_INTEGER <= more) {
      const precision = findMinimumOffsetPrecision(more)
      min = Math.max(min, more + precision)
    }
    const less = this.schema.tests.find(test => test.OPTIONS.name === 'max')?.OPTIONS.params?.less as number | undefined
    if (less !== undefined && Number.isFinite(less) && less <= Number.MAX_SAFE_INTEGER) {
      const precision = findMinimumOffsetPrecision(less)
      max = Math.min(max, less - precision)
    }

    const result = this.schema.tests.find(test => test.OPTIONS.name === 'integer')
      ? datatype.number({
          min: Math.ceil(min),
          max: Math.floor(max),
        })
      : datatype.float({
          min,
          max,
          precision: 1 / 1e16,
        })

    if ((this.schema.spec.strict || globalOptions.strict) !== true && datatype.float({ min: 0, max: 1 }) > 0.8) {
      return result + ''
    }

    return result
  }
}

addFaker(number, NumberFaker)

function findMinimumOffsetPrecision(number: number) {
  number = Math.abs(number)
  let max = 1
  let min = 1 / 1e16
  let prevMid = max
  let mid = min + (max - min) / 2
  let count = 0
  while (++count < 99) {
    if (prevMid <= Number.EPSILON) break
    if (number + mid === number) break
    prevMid = mid
    max = mid
    mid = min + (max - min) / 2
  }
  return prevMid
}
