import { addMethod, mixed, boolean, number, date, string, array, object } from 'yup'
import { fake, Fake } from '../src'
import { expectType, TypeEqual } from 'ts-expect'

it('', () => {})

declare module 'yup' {
  interface Schema<T, C = object> {
    fake<S extends Schema<unknown>>(this: S): ReturnType<Fake<S>>
  }
}

addMethod(mixed, 'fake', function () {
  return fake(this)
})

const booleanSchema = boolean()
const booleanActual = booleanSchema.fake()
expectType<TypeEqual<typeof booleanActual, ReturnType<typeof booleanSchema.cast>>>(true)
expectType<TypeEqual<typeof booleanActual, any>>(false)

const numberSchema = number()
const numberActual = numberSchema.fake()
expectType<TypeEqual<typeof numberActual, ReturnType<typeof numberSchema.cast>>>(true)
expectType<TypeEqual<typeof numberActual, any>>(false)

const stringSchema = string()
const stringActual = stringSchema.fake()
expectType<TypeEqual<typeof stringActual, ReturnType<typeof stringSchema.cast>>>(true)
expectType<TypeEqual<typeof stringActual, any>>(false)

const dateSchema = date()
const dateActual = dateSchema.fake()
expectType<TypeEqual<typeof dateActual, ReturnType<typeof dateSchema.cast>>>(true)
expectType<TypeEqual<typeof dateActual, any>>(false)

const objectSchema = object().shape({
  booleanSchema,
  numberSchema,
  stringSchema,
  dateSchema,
})
const objectActual = objectSchema.fake()
expectType<TypeEqual<typeof objectActual, ReturnType<typeof objectSchema.cast>>>(true)
expectType<TypeEqual<typeof objectActual, any>>(false)

const arraySchema = array().of(objectSchema)
const arrayActual = arraySchema.fake()
expectType<TypeEqual<typeof arrayActual, ReturnType<typeof arraySchema.cast>>>(true)
expectType<TypeEqual<typeof arrayActual, any>>(false)
