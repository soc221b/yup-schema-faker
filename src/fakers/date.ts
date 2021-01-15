import * as faker from 'faker'
import { DateSchema } from 'yup'
import { FakeSchema } from '../type'

const MIN = new Date(0).toISOString()
const MAX = new Date((Math.pow(2, 31) - 1) * 1000).toISOString()

export const fakeDate: FakeSchema<DateSchema> = (schema, fake) => {
  let min = MIN
  let max = MAX
  for (const test of schema.describe().tests) {
    if (test.name === 'min') {
      min = test.params!.min as string
    } else if (test.name === 'max') {
      max = test.params!.max as string
    }
  }
  return faker.date.between(min, max).toISOString()
}
