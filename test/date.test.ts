import { date } from 'yup'
import { fake } from '../src'

it('should works with date', () => {
  const schema = date().required()
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with min', () => {
  const now = new Date().toISOString()
  const schema = date().min(now)
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with max', () => {
  const now = new Date().toISOString()
  const schema = date().max(now)
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with min, max', () => {
  const now = new Date().toISOString()
  const schema = date().min(now).max(now)
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})
