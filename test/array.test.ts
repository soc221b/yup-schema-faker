import { array } from 'yup'
import { string } from 'yup/lib/locale'
import { fake } from '../src'

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
