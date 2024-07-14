import { boolean, number, date, string, array, object } from 'yup'
import { fake } from '../src'
import { expectType, TypeEqual } from 'ts-expect'

describe('type', () => {
  test('type', () => {
    const booleanSchema = boolean()
    const booleanActual = fake(booleanSchema)
    type BooleanExpected = ReturnType<typeof booleanSchema.validateSync>
    expectType<TypeEqual<typeof booleanActual, BooleanExpected>>(true)
    expectType<TypeEqual<typeof booleanActual, any>>(false)

    const numberSchema = number()
    const numberActual = fake(numberSchema)
    type NumberExpected = ReturnType<typeof numberSchema.validateSync>
    expectType<TypeEqual<typeof numberActual, NumberExpected>>(true)
    expectType<TypeEqual<typeof numberActual, any>>(false)

    const stringSchema = string()
    const stringActual = fake(stringSchema)
    type StringExpected = ReturnType<typeof stringSchema.validateSync>
    expectType<TypeEqual<typeof stringActual, StringExpected>>(true)
    expectType<TypeEqual<typeof stringActual, any>>(false)

    const dateSchema = date()
    const dateActual = fake(dateSchema)
    type DateExpected = ReturnType<typeof dateSchema.validateSync>
    expectType<TypeEqual<typeof dateActual, DateExpected>>(true)
    expectType<TypeEqual<typeof dateActual, any>>(false)

    const objectSchema = object().shape({
      booleanSchema,
      numberSchema,
      stringSchema,
      dateSchema,
    })
    const objectActual = fake(objectSchema)
    type ObjectExpected = ReturnType<typeof objectSchema.validateSync>
    expectType<TypeEqual<typeof objectActual, ObjectExpected>>(true)
    expectType<TypeEqual<typeof objectActual, any>>(false)

    const arraySchema = array().of(objectSchema)
    const arrayActual = fake(arraySchema)
    type ArrayExpected = ReturnType<typeof arraySchema.validateSync>
    expectType<TypeEqual<typeof arrayActual, ArrayExpected>>(true)
    expectType<TypeEqual<typeof arrayActual, any>>(false)
  })
})
