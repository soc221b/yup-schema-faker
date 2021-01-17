import { ref, object } from 'yup'
import { fake } from '../src'

it('should works with ref', () => {
  const schema = object()
    .required()
    .noUnknown()
    .shape({
      nested: object().required().shape({
        key: object().required(),
      }),
      ref: ref('nested'),
    })
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
  expect(actual.ref).toBe(actual.nested)
})
