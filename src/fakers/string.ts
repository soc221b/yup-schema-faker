import { random } from 'faker'
import { StringSchema } from 'yup'
import { FakeSchema } from '../type'

export const fakeString: FakeSchema<StringSchema> = (schema, fake) => {
  return random.words()
}
