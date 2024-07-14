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
})

it('should works with ref (context)', () => {
  const schema = object()
    .defined()
    .strict()
    .noUnknown()
    .shape({
      siblingRef: ref('$value'),
      siblingDescRef: ref('$desc.value'),
      desc: object()
        .defined()
        .strict()
        .noUnknown()
        .shape({
          siblingRef: ref('$desc.value'),
          siblingDescRef: ref('$desc.desc.value'),
          desc: object()
            .defined()
            .strict()
            .noUnknown()
            .shape({
              siblingRef: ref('$desc.desc.value'),
            }),
        }),
    })
  const context = {
    value: Math.random(),
    desc: {
      value: Math.random(),
      desc: {
        value: Math.random(),
      },
    },
  }

  const actual = fake(schema, { context })

  expect(schema.isValidSync(actual, { context })).toBe(true)
})
