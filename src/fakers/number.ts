import { NumberSchema } from 'yup'
import { FakeSchema } from '../type'
import * as faker from 'faker'

export const fakeNumber: FakeSchema<NumberSchema> = (schema, fake) => {
  let min: number = -Number.MAX_SAFE_INTEGER
  let max: number = Number.MAX_SAFE_INTEGER
  let integer: boolean | undefined = undefined

  for (const test of schema.tests) {
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

  let result = faker.random.float({
    min,
    max,
  })

  if (integer) {
    result = Math.round(result)
  }

  return result
}
