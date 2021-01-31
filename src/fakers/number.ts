import { random } from 'faker'
import { MixedFaker } from './mixed'

import type { NumberSchema } from 'yup'

export class NumberFaker extends MixedFaker<NumberSchema> {
  doFake() {
    let min: number = Number.MIN_SAFE_INTEGER
    let max: number = Number.MAX_SAFE_INTEGER
    let integer: boolean | undefined = undefined
    for (const test of this.schema.tests) {
      switch (test.OPTIONS.name) {
        case 'min':
          if (typeof test.OPTIONS.params!.min === 'number') {
            min = Math.max(min, test.OPTIONS.params!.min)
          }
          if (typeof test.OPTIONS.params!.more === 'number') {
            if (Number.isFinite(test.OPTIONS.params!.more) && Number.MIN_SAFE_INTEGER <= test.OPTIONS.params!.more) {
              const precision = findMinimumOffsetPrecision(test.OPTIONS.params!.more)
              min = Math.max(min, test.OPTIONS.params!.more + precision)
            }
          }
          break
        case 'max':
          if (typeof test.OPTIONS.params!.max === 'number') {
            max = Math.min(max, test.OPTIONS.params!.max)
          }
          if (typeof test.OPTIONS.params!.less === 'number') {
            if (Number.isFinite(test.OPTIONS.params!.less) && test.OPTIONS.params!.less <= Number.MAX_SAFE_INTEGER) {
              const precision = findMinimumOffsetPrecision(test.OPTIONS.params!.less)
              max = Math.min(max, test.OPTIONS.params!.less - precision)
            }
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

    let result

    if (integer) {
      result = random.number({
        min,
        max,
      })
    } else {
      result = random.float({
        min,
        max,
        precision: 1 / 1e16,
      })
    }

    return result
  }
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
