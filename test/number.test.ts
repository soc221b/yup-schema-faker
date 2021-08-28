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
  const schema1 = number().defined().moreThan(Number.NEGATIVE_INFINITY).lessThan(Number.POSITIVE_INFINITY)
  const actual1 = fake(schema1)
  expect(schema1.isValidSync(actual1)).toBe(true)

  const schema2 = number().defined().moreThan(Number.MAX_SAFE_INTEGER).lessThan(Number.POSITIVE_INFINITY)
  const actual2 = fake(schema2)
  expect(schema2.isValidSync(actual2)).toBe(true)

  const schema3 = number().defined().moreThan(Number.NEGATIVE_INFINITY).lessThan(Number.MIN_SAFE_INTEGER)
  const actual3 = fake(schema3)
  expect(schema3.isValidSync(actual3)).toBe(true)
})

it('should works with more than, less than (max safe integer)', () => {
  const schema1 = number().defined().moreThan(Number.MIN_SAFE_INTEGER).lessThan(Number.MAX_SAFE_INTEGER)
  const actual1 = fake(schema1)
  expect(schema1.isValidSync(actual1)).toBe(true)

  const schema2 = number()
    .defined()
    .moreThan(Number.MAX_SAFE_INTEGER - 2)
    .lessThan(Number.MAX_SAFE_INTEGER)
  const actual2 = fake(schema2)
  expect(schema2.isValidSync(actual2)).toBe(true)

  const schema3 = number()
    .defined()
    .moreThan(Number.MIN_SAFE_INTEGER)
    .lessThan(Number.MIN_SAFE_INTEGER + 2)
  const actual3 = fake(schema3)
  expect(schema3.isValidSync(actual3)).toBe(true)
})

it('should works with more than, less than (epsilon)', () => {
  const schema1 = number().defined().moreThan(-Number.EPSILON).lessThan(Number.EPSILON)
  const actual1 = fake(schema1)
  expect(schema1.isValidSync(actual1)).toBe(true)

  const schema2 = number()
    .defined()
    .moreThan(0)
    .lessThan(Number.EPSILON * 2)
  const actual2 = fake(schema2)
  expect(schema2.isValidSync(actual2)).toBe(true)

  const schema3 = number()
    .defined()
    .moreThan(-Number.EPSILON * 2)
    .lessThan(0)
  const actual3 = fake(schema3)
  expect(schema3.isValidSync(actual3)).toBe(true)
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
