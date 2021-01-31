import { ref, object } from 'yup'
import { fake } from '../src'

it('should works with ref', () => {
  const schema = object()
    .defined()
    .noUnknown()
    .shape({
      nested: object().defined().shape({
        key: object().defined(),
      }),
      ref: ref('nested'),
    })
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
  expect(actual.ref).toBe(actual.nested)
})
