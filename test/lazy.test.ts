import { lazy, object, number } from 'yup'
import { fake } from '../src'

it('should works with lazy', () => {
  const schema: any = object()
    .noUnknown()
    .shape({
      id: number(),
      child: lazy(() => schema.default(undefined)),
    })
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
})
