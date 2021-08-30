import { object, array, number } from 'yup'
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
  const schema = object().defined()
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with shape', () => {
  const schema = object().defined().shape({ key: object().defined() })
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with noUnknown', () => {
  const schema = object().defined().shape({ key: object().defined() }).noUnknown()
  let actual = fake(schema)
  if (typeof actual === 'string') actual = JSON.parse(actual)
  expect(Object.keys(actual).length).toBe(1)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with noUnknown', () => {
  const schema = object().strict(true).defined().shape({ key: object().defined() }).noUnknown()
  const actual = fake(schema)
  expect(Object.keys(actual).length).toBe(1)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should sometimes fake stringified data when not in strict mode', () => {
  const schema = object().defined()
  let count = 0
  let actual: any
  do {
    actual = fake(schema)
  } while (typeof actual === 'object' && ++count < SAFE_COUNT)
  expect(typeof actual).toBe('string')
  expect(typeof JSON.parse(actual)).toBe('object')
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should inherit strict mode', () => {
  const schema = object({
    key: array(number().defined()).min(10000).max(10000).defined(),
  })
    .strict(true)
    .defined()
  const actual = fake(schema)
  actual.key!.every(s => expect(typeof s).not.toBe('string'))
  expect(schema.isValidSync(actual)).toBe(true)
})
