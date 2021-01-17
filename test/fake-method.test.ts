import { addMethod, mixed, boolean, number, date, string, array, object } from 'yup'
import { fake } from '../src'

declare module 'yup' {
  interface BaseSchema {
    fake(): any
  }
}

addMethod(mixed, 'fake', function () {
  return fake(this)
})

it('should add fake method to yup', () => {
  const booleanSchema = boolean().required()
  expect(booleanSchema.isValidSync(booleanSchema.fake())).toBe(true)

  const numberSchema = number().required()
  expect(numberSchema.isValidSync(numberSchema.fake())).toBe(true)

  const stringSchema = string().required()
  expect(stringSchema.isValidSync(stringSchema.fake())).toBe(true)

  const dateSchema = date().required()
  expect(dateSchema.isValidSync(dateSchema.fake())).toBe(true)

  const objectSchema = object().required().shape({
    booleanSchema,
    numberSchema,
    stringSchema,
    dateSchema,
  })
  expect(objectSchema.isValidSync(objectSchema.fake())).toBe(true)

  const arraySchema = array().required().of(objectSchema)
  expect(arraySchema.isValidSync(arraySchema.fake())).toBe(true)
})
