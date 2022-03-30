import { boolean, number, date, string, array, object } from 'yup'
import { fake } from '../src'
import { expectType, TypeEqual } from 'ts-expect'

describe('type', () => {
  test('type', () => {
    const booleanSchema = boolean()
    const booleanActual = fake(booleanSchema)
    expectType<TypeEqual<typeof booleanActual, ReturnType<typeof booleanSchema.cast>>>(true)
    expectType<TypeEqual<typeof booleanActual, any>>(false)

    const numberSchema = number()
    const numberActual = fake(numberSchema)
    expectType<TypeEqual<typeof numberActual, ReturnType<typeof numberSchema.cast>>>(true)
    expectType<TypeEqual<typeof numberActual, any>>(false)

    const stringSchema = string()
    const stringActual = fake(stringSchema)
    expectType<TypeEqual<typeof stringActual, ReturnType<typeof stringSchema.cast>>>(true)
    expectType<TypeEqual<typeof stringActual, any>>(false)

    const dateSchema = date()
    const dateActual = fake(dateSchema)
    expectType<TypeEqual<typeof dateActual, ReturnType<typeof dateSchema.cast>>>(true)
    expectType<TypeEqual<typeof dateActual, any>>(false)

    const objectSchema = object().shape({
      booleanSchema,
      numberSchema,
      stringSchema,
      dateSchema,
    })
    const objectActual = fake(objectSchema)
    expectType<TypeEqual<typeof objectActual, ReturnType<typeof objectSchema.cast>>>(true)
    expectType<TypeEqual<typeof objectActual, any>>(false)

    const arraySchema = array().of(objectSchema)
    const arrayActual = fake(arraySchema)
    expectType<TypeEqual<typeof arrayActual, ReturnType<typeof arraySchema.cast>>>(true)
    expectType<TypeEqual<typeof arrayActual, any>>(false)
  })
})
