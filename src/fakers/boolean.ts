import * as faker from 'faker'
import { BooleanSchema } from 'yup'
import { FakeSchema } from '../type'

export const fakeBoolean: FakeSchema<BooleanSchema> = (schema, fake) => {
  return faker.random.boolean()
}
