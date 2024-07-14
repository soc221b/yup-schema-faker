import { number } from 'yup'
import { getFaker } from '../faker'
import { addFaker, globalOptions, SchemaFaker } from './schema'

import type { NumberSchema } from 'yup'

const exponents = Array(54)
  .fill(null)
  .map((_, i) => i)

export class NumberFaker extends SchemaFaker<NumberSchema> {
  doFake() {
    let min =
      (this.schema.tests.find(test => test.OPTIONS?.name === 'min')?.OPTIONS?.params?.min as number | undefined) ??
      -1 * (Math.pow(2, exponents[getFaker().number.int({ min: 0, max: exponents.length - 1 })]) - 1)
    let max =
      (this.schema.tests.find(test => test.OPTIONS?.name === 'max')?.OPTIONS?.params?.max as number | undefined) ??
      Math.pow(2, exponents[getFaker().number.int({ min: 0, max: exponents.length - 1 })]) - 1
    max = Math.max(min, max)

    const more = this.schema.tests.find(test => test.OPTIONS?.name === 'min')?.OPTIONS?.params?.more as
      | number
      | undefined
    if (more !== undefined && Number.isFinite(more) && Number.MIN_SAFE_INTEGER <= more) {
      const precision = findMinimumOffsetPrecision(more)
      const _min = more + precision
      min = Math.max(min, _min)
      max = Math.max(max, _min)
    }
    const less = this.schema.tests.find(test => test.OPTIONS?.name === 'max')?.OPTIONS?.params?.less as
      | number
      | undefined
    if (less !== undefined && Number.isFinite(less) && less <= Number.MAX_SAFE_INTEGER) {
      const precision = findMinimumOffsetPrecision(less)
      const _max = less - precision
      max = Math.min(max, _max)
      min = Math.min(min, _max)
    }

    const result = this.schema.tests.find(test => test.OPTIONS?.name === 'integer')
      ? getFaker().number.int({
          min: Math.ceil(min),
          max: Math.floor(max),
        })
      : getFaker().number.float({
          min,
          max,
        })

    if (
      (this.schema.spec.strict || globalOptions.strict) !== true &&
      getFaker().number.float({ min: 0, max: 1 }) > 0.8
    ) {
      return result + ''
    }

    return result
  }
}

export const installNumberFaker = () => {
  addFaker(number, NumberFaker)
}

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
