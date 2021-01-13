import { AnySchema, ArraySchema } from 'yup'
import { FakeSchema } from '../type'
import { typeToFaker } from '..'
import { random } from 'faker'

export const fakeArray: FakeSchema<ArraySchema<AnySchema>> = (schema, fake) => {
  let min: number = 0
  let max: number | undefined = undefined
  for (const test of schema.describe().tests) {
    switch (test.name) {
      case 'min':
        min = test.params!.min as number
        break
      case 'max':
        max = test.params!.max as number
        break
      case 'length':
        min = test.params!.length as number
        max = test.params!.length as number
        break
    }
  }

  if (max === undefined) {
    max = min + 10
  }

  const innerSchema = schema.innerType
  if (innerSchema) {
    return Array(random.number({ min, max }))
      .fill(null)
      .map(() => fake(schema.innerType!))
  } else {
    return Array(random.number({ min, max })).fill(null)
  }
}

typeToFaker.set('array', fakeArray)
