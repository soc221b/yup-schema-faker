import * as faker from 'faker'
import { DateSchema } from 'yup'
import { FakeSchema } from '../type'

export const fakeDate: FakeSchema<DateSchema> = (schema, fake) => {
  return faker.date.future().toISOString()
}
