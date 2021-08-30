import { ref, object, mixed } from 'yup'
import { fake } from '../src'

it('should works with ref', () => {
  const schema = object()
    .defined()
    .strict(true)
    .noUnknown()
    .shape({
      siblingRef: ref('value'),
      value: mixed(),
      siblingDescRef: ref('desc.value'),
      desc: object()
        .defined()
        .strict(true)
        .noUnknown()
        .shape({
          siblingRef: ref('value'),
          value: mixed(),
          siblingDescRef: ref('desc.value'),
          desc: object()
            .defined()
            .strict(true)
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

it('should works with ref', () => {
  const schema = object()
    .defined()
    .strict(true)
    .noUnknown()
    .shape({
      siblingRef: ref('$value'),
      siblingDescRef: ref('$desc.value'),
      desc: object()
        .defined()
        .strict(true)
        .noUnknown()
        .shape({
          siblingRef: ref('$desc.value'),
          siblingDescRef: ref('$desc.desc.value'),
          desc: object()
            .defined()
            .strict(true)
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
  const exp = schema.cast(actual, { context })
  expect(actual).toBe(exp)
})
