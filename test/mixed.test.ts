import { mixed, object, boolean } from 'yup'
import { fake } from '../src'
import { SAFE_COUNT } from './constant'

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
      when: mixed().when('isTrue', {
        is: (value: boolean) => value,
        then: boolean().defined().isTrue(),
        otherwise: boolean().defined().isFalse(),
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
      when: mixed().when('$isTrue', {
        is: (value: boolean) => value,
        then: boolean().defined().isTrue(),
        otherwise: boolean().defined().isFalse(),
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
        then: boolean().defined().isTrue(),
        otherwise: boolean().defined().isFalse(),
      }),
    })
  const context = {
    context: boolean().defined(),
  }
  const actual = fake(schema, { context })
  expect(schema.isValidSync(actual, { context })).toBe(true)
})
