import { number } from 'yup'
import { fake } from '../src'

const SAFE_COUNT = 99999
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
  const schema = number().required()
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with number.min', () => {
  const schema = number().required().min(42)
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with number.max', () => {
  const schema = number().required().max(42)
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with number.integer', () => {
  const schema = number().required().integer()
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with more than, less than', () => {
  const schema = number().required().moreThan(0.1).lessThan(0.2)
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with positive', () => {
  const schema = number().required().positive().max(1)
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with negative', () => {
  const schema = number().required().negative().min(-1)
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})
