import { ref, object, mixed } from 'yup'
import { fake } from '../src'

it('should works with ref', () => {
  const schema = object()
    .defined()
    .strict()
    .noUnknown()
    .shape({
      siblingRef: ref('value'),
      value: mixed(),
      siblingDescRef: ref('desc.value'),
      desc: object()
        .defined()
        .strict()
        .noUnknown()
        .shape({
          siblingRef: ref('value'),
          value: mixed(),
          siblingDescRef: ref('desc.value'),
          desc: object()
            .defined()
            .strict()
            .noUnknown()
            .shape({
              siblingRef: ref('value'),
              value: mixed(),
            }),
        }),
    })

  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)

  const exp = schema.cast(actual)
  expect(actual).toBe(exp)
})
