import { object } from 'yup'
import { fake } from '../src'

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
