import { object } from 'yup'
import { fake } from '../src'
import { SAFE_COUNT } from './constant'

it('should works with default', () => {
  const defaultData = {}
  const defaultCb = jest.fn(() => defaultData)
  const schema = object().default(defaultCb)
  let count = 0
  let actual
  do {
    actual = fake(schema)
  } while (defaultCb.mock.calls.length === 0 && ++count < SAFE_COUNT)
  expect(actual).toBe(defaultData)
})

it('should works with object', () => {
  const schema = object().required()
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with shape', () => {
  const schema = object().required().shape({ key: object().required() })
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with noUnknown', () => {
  const schema = object().required().shape({ key: object().required() }).noUnknown()
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})
