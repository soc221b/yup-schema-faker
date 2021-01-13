import { random } from 'faker'
import { BooleanSchema } from 'yup'
import { FakeSchema } from '../type'
import { typeToFaker } from '..'

export const fakeBoolean: FakeSchema<BooleanSchema> = (schema, fake) => {
  return random.boolean()
}

typeToFaker.set('boolean', fakeBoolean)
