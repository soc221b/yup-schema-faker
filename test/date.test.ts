import { date } from 'yup'
import { fake } from '../src'
import { SAFE_COUNT } from './constant'

it('should works with default', () => {
  const defaultData = new Date()
  const defaultCb = jest.fn(() => defaultData)
  const schema = date().default(defaultCb)
  let count = 0
  let actual
  do {
    actual = fake(schema)
  } while (defaultCb.mock.calls.length === 0 && ++count < SAFE_COUNT)
  expect(actual).toBeInstanceOf(Date)
  expect(actual.toISOString()).toBe(defaultData.toISOString())
})

it('should works with date', () => {
  const schema = date().required()
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with min', () => {
  const now = new Date().toISOString()
  const schema = date().required().min(now)
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with max', () => {
  const now = new Date().toISOString()
  const schema = date().required().max(now)
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with min, max', () => {
  const now = new Date().toISOString()
  const schema = date().required().min(now).max(now)
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})
