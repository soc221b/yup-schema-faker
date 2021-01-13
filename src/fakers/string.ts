import { random } from 'faker'
import { StringSchema } from 'yup'
import { FakeSchema } from '../type'
import { typeToFaker } from '..'

export const fakeString: FakeSchema<StringSchema> = (schema, fake) => {
  return random.words()
}

typeToFaker.set('string', fakeString)
