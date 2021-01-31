import { lazy, object } from 'yup'
import { fake } from '../src'

it('should works with lazy', () => {
  const schema: any = object()
    .defined()
    .noUnknown()
    .shape({
      nested: object().defined().noUnknown().shape({
        key: object().defined().noUnknown(),
      }),
      lazyKey: lazy(() => schema.fields.nested),
    })
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
  expect(actual.lazyKey).toEqual(actual.nested)
})
