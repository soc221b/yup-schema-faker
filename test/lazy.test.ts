import { lazy, object, number, array } from 'yup'
import { fake } from '../src'
import { SAFE_COUNT } from './constant'

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
  const schema: any = array()
    .min(1)
    .of(
      object()
        .strict()
        .noUnknown()
        .required()
        .shape({
          id: number().required(),
          under: lazy(() => schema.notRequired().default(undefined)),
        }),
    )
  let count = 0
  let actual
  do {
    actual = fake(schema)
    if (typeof actual === 'string') actual = JSON.parse(actual)
  } while ((actual === undefined || actual.every((item: any) => item.under === undefined)) && ++count < SAFE_COUNT)
  expect(schema.isValidSync(actual)).toBe(true)
})
