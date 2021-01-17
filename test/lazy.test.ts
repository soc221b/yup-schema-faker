import { lazy, object } from 'yup'
import { fake } from '../src'

it('should works with lazy', () => {
  const schema: any = object()
    .required()
    .noUnknown()
    .shape({
      nested: object().required().noUnknown().shape({
        key: object().required().noUnknown(),
      }),
      lazyKey: lazy(() => schema.fields.nested),
    })
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
  expect(actual.lazyKey).toEqual(actual.nested)
})
