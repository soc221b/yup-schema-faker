import { mixed, object, boolean } from 'yup'
import { fake } from '../src'

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
