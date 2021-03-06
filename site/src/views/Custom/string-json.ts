import { addMethod, string, AnySchema } from 'yup'
import { fake, fakeDedicatedTest } from 'yup-schema-faker'

// Extend json method for string schema
addMethod(string, 'json', function (schema: AnySchema) {
  return this.test({
    name: 'json',
    params: {
      schema,
    },
    test(value: unknown) {
      try {
        const parsedValue = JSON.parse(value as string)
        return schema.isValidSync(parsedValue)
      } catch (error) {
        return false
      }
    },
  })
})

// When the json test occurs, this faker will be run.
fakeDedicatedTest(string, 'json', schema => {
  // Find the test and extract its schema
  const innerSchema = schema.tests.find(test => test.OPTIONS.name === 'json')?.OPTIONS.params?.schema as AnySchema
  // Generate a fake data by given schema and stringify it.
  return JSON.stringify(fake(innerSchema))
})
