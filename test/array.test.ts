import { array } from 'yup'
import { fake } from '../src'
import { SAFE_COUNT } from './constant'

it('should works with default', () => {
  const defaultData: any[] = []
  const defaultCb = jest.fn(() => defaultData)
  const schema = array().default(defaultCb)
  let count = 0
  let actual
  do {
    actual = fake(schema)
  } while (defaultCb.mock.calls.length === 0 && ++count < SAFE_COUNT)
  expect(actual).toBe(defaultData)
})

it('should works with array', () => {
  const schema = array().required()
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with min', () => {
  const schema = array().required().min(42)
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with max', () => {
  const schema = array().required().max(42)
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with min and max', () => {
  const schema = array().required().min(42).max(42)
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with length', () => {
  const schema = array().required().length(42)
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with of', () => {
  const schema = array().required().length(1).of(array().required())
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})
