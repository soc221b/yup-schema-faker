import { boolean } from 'yup'
import { fake } from '../src'

const SAFE_COUNT = 99999
it('should works with default', () => {
  const defaultData = Math.random() > 0.5
  const defaultCb = jest.fn(() => defaultData)
  const schema = boolean().default(defaultCb)
  let count = 0
  let actual
  do {
    actual = fake(schema)
  } while (defaultCb.mock.calls.length === 0 && ++count < SAFE_COUNT)
  expect(actual).toBe(defaultData)
})

it('should works with notOneOf', () => {
  const schema = boolean().required().notOneOf([false])
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with boolean', () => {
  const schema = boolean().required()
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with isTrue', () => {
  const schema = boolean().required().isTrue()
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
  expect(actual).toBe(true)
})

it('should works with isFalse', () => {
  const schema = boolean().required().isFalse()
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
  expect(actual).toBe(false)
})
