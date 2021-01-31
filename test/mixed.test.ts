import { mixed, object, boolean } from 'yup'
import { fake } from '../src'
import { SAFE_COUNT } from './constant'

it('should works without required', () => {
  const schema = mixed()
  let count = 0
  let actual
  do {
    actual = fake(schema)
  } while (actual !== undefined && ++count < SAFE_COUNT)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with required', () => {
  const schema = mixed().required()
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with nullable', async () => {
  const schema = mixed().required().nullable()
  let count = 0
  let actual
  do {
    actual = fake(schema)
  } while (actual !== null && ++count < SAFE_COUNT)
  // https://github.com/jquense/yup/issues/1242
  expect(actual).toBe(null)
})

it('should works with oneOf', () => {
  const data = {}
  const schema = mixed().required().oneOf([data])
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with when', () => {
  const schema = object()
    .required()
    .noUnknown()
    .shape({
      isTrue: boolean().required(),
      when: mixed().when('isTrue', {
        is: (value: boolean) => value,
        then: boolean().required().isTrue(),
        otherwise: boolean().required().isFalse(),
      }),
    })
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})
