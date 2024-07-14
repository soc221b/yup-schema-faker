import { mixed, object, boolean, BooleanSchema } from 'yup'
import { fake } from '../src'
import { SAFE_COUNT } from './constant'
import { expectType, TypeEqual } from 'ts-expect'

it('should infer correct type', () => {
  const schema = boolean()
  const actual = fake(schema)
  expectType<TypeEqual<typeof actual, boolean | undefined>>(true)
})

it('should infer correct type with defined', () => {
  const schema = boolean().defined()
  const actual = fake(schema)
  expectType<TypeEqual<typeof actual, boolean>>(true)
})

it('should infer correct type with optional', () => {
  const schema = boolean().defined().optional()
  const actual = fake(schema)
  expectType<TypeEqual<typeof actual, boolean | undefined>>(true)
})

it('should infer correct type with nullable', () => {
  const schema = boolean().nullable()
  const actual = fake(schema)
  expectType<TypeEqual<typeof actual, boolean | null | undefined>>(true)
})

it('should infer correct type with nonNullable', () => {
  const schema = boolean().nullable().nonNullable()
  const actual = fake(schema)
  expectType<TypeEqual<typeof actual, boolean | undefined>>(true)
})

it('should infer correct type with required', () => {
  const schema = boolean().optional().nullable().required()
  const actual = fake(schema)
  expectType<TypeEqual<typeof actual, boolean>>(true)
})

it('should works without required', () => {
  const schema = mixed()
  let count = 0
  let actual
  do {
    actual = fake(schema)
  } while (actual !== undefined && ++count < SAFE_COUNT)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with defined', () => {
  const schema = mixed().defined()
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with optional', () => {
  const schema = mixed().optional()
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with required', () => {
  const schema = mixed().required()
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('required not allows null values', () => {
  const schema = mixed().required().nullable()
  let count = 0
  let actual
  do {
    actual = fake(schema)
  } while (actual !== null && ++count < SAFE_COUNT)
  expect(schema.isValidSync(actual)).toBe(true)
  expect(actual).not.toBe(null)
})

it('should works with nullable', async () => {
  const schema = mixed().nullable()
  let count = 0
  let actual
  do {
    actual = fake(schema)
  } while (actual !== null && ++count < SAFE_COUNT)
  expect(schema.isValidSync(actual)).toBe(true)
  expect(actual).toBe(null)
})

it('defined allows null values', () => {
  const schema = mixed().defined().nullable()
  let count = 0
  let actual
  do {
    actual = fake(schema)
  } while (actual !== null && ++count < SAFE_COUNT)
  expect(schema.isValidSync(actual)).toBe(true)
  expect(actual).toBe(null)
})

it('should works with default (return default)', () => {
  const defaultData = new Date()
  const defaultCb = jest.fn(() => defaultData)
  const schema = mixed().default(defaultCb)
  let count = 0
  let actual
  do {
    actual = fake(schema)
  } while (defaultCb.mock.calls.length === 0 && ++count < SAFE_COUNT)
  expect(actual).toBeInstanceOf(Date)
  expect(actual.toISOString()).toBe(defaultData.toISOString())
})

it('should works with default (return random value)', () => {
  const defaultData = new Date()
  const defaultCb = jest.fn(() => defaultData)
  const schema = mixed().default(defaultCb)
  let actual
  do {
    actual = fake(schema)
  } while (actual === defaultData)
  expect(actual).not.toBe(defaultData)
})

it('should not return undefined if provide default', () => {
  const schema = mixed().default(123)
  let count = 0
  let actual
  do {
    actual = fake(schema)
    expect(actual).not.toBe(undefined)
  } while (++count < SAFE_COUNT)
})

it('should works with oneOf', () => {
  const data = {}
  const schema = mixed().defined().oneOf([data])
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with both oneOf and notOneOf', () => {
  const schema = mixed().defined().oneOf(['jimmy', 42]).notOneOf([42])
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
  expect(actual).toBe('jimmy')

  const schema2 = mixed().defined().notOneOf([42]).oneOf([42])
  const actual2 = fake(schema2)
  expect(schema2.isValidSync(actual2)).toBe(true)
  expect(actual2).toBe(42)
})

it('should works with when', () => {
  const schema = object()
    .defined()
    .noUnknown()
    .shape({
      isTrue: boolean().defined(),
      when: boolean().when('isTrue', {
        is: (value: boolean) => value,
        then: schema => schema.defined().isTrue(),
        otherwise: schema => schema.defined().isFalse(),
      }),
    })
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with when (with context)', () => {
  const schema = object()
    .defined()
    .noUnknown()
    .shape({
      when: boolean().when('$isTrue', {
        is: (value: boolean) => value,
        then: schema => schema.defined().isTrue(),
        otherwise: schema => schema.defined().isFalse(),
      }),
    })
  const context = {
    isTrue: Math.random() > 0.5,
  }
  const actual = fake(schema, { context })
  expect(schema.isValidSync(actual, { context })).toBe(true)
})

it('should works with when (with multiple dependencies)', () => {
  const schema = object()
    .defined()
    .strict()
    .noUnknown()
    .shape({
      sibling: boolean().defined(),
      count: boolean().when(['$sibling', '$context'], {
        is: (sibling: boolean, context: boolean) => sibling && context,
        then: schema => schema.defined().isTrue(),
        otherwise: schema => schema.defined().isFalse(),
      }),
    })
  const context = {
    context: boolean().defined(),
  }
  const actual = fake(schema, { context })
  expect(schema.isValidSync(actual, { context })).toBe(true)
})

it('should works with when (with function)', () => {
  const schema = object()
    .strict()
    .defined()
    .noUnknown()
    .shape({
      isTrue: boolean().defined(),
      when: boolean()
        .defined()
        .when('isTrue', ([isTrue], schema: BooleanSchema) => {
          return isTrue ? schema.isTrue() : schema.isFalse()
        }),
    })
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('random schema should be independent', () => {
  let count
  const defaultValue = {}

  const schemaWithDefault = mixed().default(() => defaultValue)
  count = 0
  let resultMaybeDefault
  do {
    resultMaybeDefault = fake(schemaWithDefault)
  } while (resultMaybeDefault !== defaultValue && ++count < SAFE_COUNT)
  expect(resultMaybeDefault).toBe(defaultValue)

  const schemaWithoutDefault = mixed()
  count = 0
  let resultShouldNotBeDefault
  do {
    resultShouldNotBeDefault = fake(schemaWithoutDefault)
  } while (resultShouldNotBeDefault !== defaultValue && ++count < SAFE_COUNT)
  expect(resultShouldNotBeDefault).not.toBe(defaultValue)
})
