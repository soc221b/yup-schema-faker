import { lazy, object, number, array } from 'yup'
import { fake } from '../src'

it('should works with lazy (object)', () => {
  const schema: any = object()
    .noUnknown()
    .shape({
      id: number(),
      child: lazy(() => schema.default(undefined)),
    })
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})

it('should works with lazy (array)', () => {
  const schema: any = array().of(
    object()
      .strict()
      .noUnknown()
      .required()
      .shape({
        id: number().required(),
        under: lazy(() => schema.notRequired().default(undefined)),
      }),
  )
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})
