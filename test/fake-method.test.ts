import { addMethod, mixed, boolean, number, date, string, array, object, AnySchema } from 'yup'
import { fake, Fake } from '../src'

declare module 'yup' {
  interface BaseSchema {
    fake<Schema extends AnySchema>(this: Schema): ReturnType<Fake<Schema>>
  }
}

beforeAll(() => {
  addMethod(mixed, 'fake', function () {
    return fake(this)
  })
})

it('should add fake method to yup', () => {
  const booleanSchema = boolean().defined()
  expect(booleanSchema.isValidSync(booleanSchema.fake())).toBe(true)

  const numberSchema = number().defined()
  expect(numberSchema.isValidSync(numberSchema.fake())).toBe(true)

  const stringSchema = string().defined()
  expect(stringSchema.isValidSync(stringSchema.fake())).toBe(true)

  const dateSchema = date().defined()
  expect(dateSchema.isValidSync(dateSchema.fake())).toBe(true)

  const objectSchema = object().defined().shape({
    booleanSchema,
    numberSchema,
    stringSchema,
    dateSchema,
  })
  expect(objectSchema.isValidSync(objectSchema.fake())).toBe(true)

  const arraySchema = array().defined().of(objectSchema)
  expect(arraySchema.isValidSync(arraySchema.fake())).toBe(true)
})
