import { object, array, number, boolean } from 'yup'
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
  const schema = object().strict().defined().shape({ key: object().defined() }).noUnknown()
  const actual = fake(schema)
  expect(Object.keys(actual).length).toBe(1)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should inherit strict mode', () => {
  const schema = object({
    key: array(number().defined()).length(10000).defined(),
  })
    .strict()
    .defined()
  const actual = fake(schema)
  actual.key!.every((s: unknown) => expect(typeof s).not.toBe('string'))
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with pick', () => {
  const schema = object().defined().shape({ a: boolean().defined(), b: boolean().defined() }).pick(['a']).noUnknown()
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with omit', () => {
  const schema = object().defined().shape({ a: boolean().defined(), b: boolean().defined() }).omit(['a']).noUnknown()
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with partial', () => {
  const schema = object().defined().shape({ a: boolean().defined() }).partial().noUnknown()
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with deepPartial', () => {
  const schema = object()
    .defined()
    .shape({ deep: object().defined().shape({ a: boolean().defined() }).noUnknown() })
    .deepPartial()
    .noUnknown()
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with concat', () => {
  const schema = object()
    .defined()
    .shape({ a: boolean().defined(), b: boolean().defined() })
    .concat(object().defined().shape({ a: number().defined(), c: number().defined() }))
    .noUnknown()
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})
