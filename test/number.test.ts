import { number } from 'yup'
import { fake } from '../src'
import { SAFE_COUNT } from './constant'

it('should works with default', () => {
  const defaultData = Math.random()
  const defaultCb = jest.fn(() => defaultData)
  const schema = number().default(defaultCb)
  let count = 0
  let actual
  do {
    actual = fake(schema)
  } while (defaultCb.mock.calls.length === 0 && ++count < SAFE_COUNT)
  expect(actual).toBe(defaultData)
})

it('should works with number', () => {
  const schema = number().defined()
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should sometimes fake string type number when not in strict mode', () => {
  const schema = number().defined()
  let count = 0
  let actual
  do {
    actual = fake(schema)
  } while (typeof actual === 'number' && ++count < SAFE_COUNT)
  expect(typeof actual).toBe('string')
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should not fake string type number when set strict option to true', () => {
  const schema = number().defined()
  let count = 0
  let actual
  do {
    actual = fake(schema, { strict: true })
  } while (typeof actual === 'number' && ++count < SAFE_COUNT)
  expect(typeof actual).toBe('number')
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with number.min', () => {
  const schema = number().defined().min(42)
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with number.max', () => {
  const schema = number().defined().max(42)
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with number.integer', () => {
  const schema = number().defined().integer()
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with more than, less than', () => {
  const schema = number().defined().moreThan(0.1).lessThan(0.2)
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with more than, less than (Infinity)', () => {
  let count
  let actual
  let schema

  count = 0
  schema = number().defined().moreThan(Number.NEGATIVE_INFINITY).lessThan(Number.POSITIVE_INFINITY)
  do {
    actual = fake(schema)
    expect(schema.isValidSync(actual)).toBe(true)
  } while (++count < SAFE_COUNT)

  count = 0
  schema = number().defined().moreThan(Number.MAX_SAFE_INTEGER).lessThan(Number.POSITIVE_INFINITY)
  do {
    actual = fake(schema)
    expect(schema.isValidSync(actual)).toBe(true)
  } while (++count < SAFE_COUNT)

  count = 0
  schema = number().defined().moreThan(Number.NEGATIVE_INFINITY).lessThan(Number.MIN_SAFE_INTEGER)
  do {
    actual = fake(schema)
    expect(schema.isValidSync(actual)).toBe(true)
  } while (++count < SAFE_COUNT)
})

it('should works with more than, less than (max safe integer)', () => {
  let count
  let actual
  let schema

  count = 0
  schema = number().defined().moreThan(Number.MIN_SAFE_INTEGER).lessThan(Number.MAX_SAFE_INTEGER)
  do {
    actual = fake(schema)
    expect(schema.isValidSync(actual)).toBe(true)
  } while (++count < SAFE_COUNT)

  count = 0
  schema = number()
    .defined()
    .moreThan(Number.MAX_SAFE_INTEGER - 2)
    .lessThan(Number.MAX_SAFE_INTEGER)
    .strict()
  do {
    actual = fake(schema)
    expect(actual).toBe(Number.MAX_SAFE_INTEGER - 1)
    expect(schema.isValidSync(actual)).toBe(true)
  } while (++count < SAFE_COUNT)

  count = 0
  schema = number()
    .defined()
    .moreThan(Number.MIN_SAFE_INTEGER)
    .lessThan(Number.MIN_SAFE_INTEGER + 2)
    .strict()
  do {
    actual = fake(schema)
    expect(actual).toBe(Number.MIN_SAFE_INTEGER + 1)
    expect(schema.isValidSync(actual)).toBe(true)
  } while (++count < SAFE_COUNT)
})

it('should works with more than, less than (epsilon)', () => {
  let count
  let actual
  let schema

  count = 0
  schema = number().defined().moreThan(-Number.EPSILON).lessThan(Number.EPSILON)
  do {
    actual = fake(schema)
    expect(schema.isValidSync(actual)).toBe(true)
  } while (++count < SAFE_COUNT)

  count = 0
  schema = number()
    .defined()
    .moreThan(0)
    .lessThan(Number.EPSILON * 2)
  do {
    actual = fake(schema)
    expect(schema.isValidSync(actual)).toBe(true)
  } while (++count < SAFE_COUNT)

  count = 0
  schema = number()
    .defined()
    .moreThan(-Number.EPSILON * 2)
    .lessThan(0)
  do {
    actual = fake(schema)
    expect(schema.isValidSync(actual)).toBe(true)
  } while (++count < SAFE_COUNT)
})

it('should works with positive', () => {
  const schema = number().defined().positive().max(1)
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with negative', () => {
  const schema = number().defined().negative().min(-1)
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})
