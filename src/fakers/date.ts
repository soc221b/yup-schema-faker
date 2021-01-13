import { date } from 'faker'
import { DateSchema } from 'yup'
import { FakeSchema } from '../type'
import { typeToFaker } from '..'

export const fakeDate: FakeSchema<DateSchema> = (schema, fake) => {
  return date.future().toISOString()
}

typeToFaker.set('date', fakeDate)
