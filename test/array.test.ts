import { array, number, object } from 'yup'
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
  const schema = array().defined()
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with min', () => {
  const schema = array().defined().min(42)
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with max', () => {
  const schema = array().defined().max(42)
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with min and max', () => {
  const schema = array().defined().min(42).max(42)
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with length', () => {
  const schema = array().defined().length(42)
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with min, max, and length', () => {
  const length = 42
  const schema = array()
    .defined()
    .min(length / 2)
    .length(length)
    .max(length * 2)
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with of', () => {
  const schema = array().defined().length(1).of(array().defined())
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should inherit strict mode', () => {
  const schema = array(object({ key: number().defined() }).defined())
    .length(10000)
    .strict()
    .defined()
  const actual = fake(schema)
  actual!.every(o => expect(typeof o).toBe('object'))
  actual!.every(o => expect(typeof o.key).not.toBe('string'))
  expect(schema.isValidSync(actual)).toBe(true)
})
