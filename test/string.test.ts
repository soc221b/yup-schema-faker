import { string } from 'yup'
import { fake } from '../src'
import { SAFE_COUNT } from './constant'

it('should works with default', () => {
  const defaultData = Math.random().toString(36)
  const defaultCb = jest.fn(() => defaultData)
  const schema = string().default(defaultCb)
  let count = 0
  let actual
  do {
    actual = fake(schema)
  } while (defaultCb.mock.calls.length === 0 && ++count < SAFE_COUNT)
  expect(actual).toBe(defaultData)
})

it('should fake data for string schema', () => {
  const schema = string().defined()
  const actual = fake(schema)
  expect(typeof actual).toBe('string')
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with required', () => {
  const schema = string().required().max(1)
  let count = 0
  let actual: string
  do {
    actual = fake(schema) as string
  } while (actual.length !== 0 && ++count < SAFE_COUNT)
  expect(schema.isValidSync(actual)).toBe(true)
  expect(actual.length).toBe(1)
})

it('should works with email', () => {
  const emailRe =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  const schema = string().defined().email()
  const actual = fake(schema)
  expect(actual).toMatch(emailRe)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with url', () => {
  const urlRe =
    /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/
  const schema = string().defined().url()
  const actual = fake(schema)
  expect(actual).toMatch(urlRe)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with uuid', () => {
  const uuidRe = /^[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}$/
  const schema = string().defined().uuid()
  const actual = fake(schema)
  expect(actual).toMatch(uuidRe)
  expect(schema.isValidSync(actual)).toBe(true)
})

const length = 20
it('should works with min', () => {
  const schema = string().defined().min(length)
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with max', () => {
  const schema = string().defined().max(length)
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with min, max', () => {
  const schema = string().defined().min(length).max(length)
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('can be empty string', () => {
  const schema = string().max(1)
  let count = 0
  let actual: string
  do {
    actual = fake(schema) as string
  } while ((typeof actual !== 'string' || actual.length !== 0) && ++count < SAFE_COUNT)
  expect(typeof actual === 'string').toBe(true)
  expect(actual.length).toBe(0)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with length', () => {
  const schema = string().defined().length(length)
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with min, max, and length', () => {
  const schema = string()
    .defined()
    .min(length / 2)
    .length(length)
    .max(length * 2)
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with lowercase', () => {
  const schema = string().strict().defined().lowercase()
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with uppercase', () => {
  const schema = string().strict().defined().uppercase()
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with matches', () => {
  const regex = /^(42){42}$/
  const schema = string().defined().matches(regex)
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with trim', () => {
  const schema = string().defined().strict().trim().min(10).max(20)
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with datetime', () => {
  const schema = string().defined().strict().datetime()
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})
