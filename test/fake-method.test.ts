import { boolean, number, date, string, array, object } from 'yup'
import { fake } from '../src'

it('should add fake method to yup', () => {
  const booleanSchema = boolean().defined()
  expect(booleanSchema.isValidSync(fake(booleanSchema))).toBe(true)

  const numberSchema = number().defined()
  expect(numberSchema.isValidSync(fake(numberSchema))).toBe(true)

  const stringSchema = string().defined()
  expect(stringSchema.isValidSync(fake(stringSchema))).toBe(true)

  const dateSchema = date().defined()
  expect(dateSchema.isValidSync(fake(dateSchema))).toBe(true)

  const objectSchema = object().defined().shape({
    booleanSchema,
    numberSchema,
    stringSchema,
    dateSchema,
  })
  expect(objectSchema.isValidSync(fake(objectSchema))).toBe(true)

  const arraySchema = array().defined().of(objectSchema)
  expect(arraySchema.isValidSync(fake(arraySchema))).toBe(true)
})
