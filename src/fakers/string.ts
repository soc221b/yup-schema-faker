import { random, internet, lorem } from 'faker'
import { randexp } from 'randexp'
import { StringSchema } from 'yup'
import { FakeSchema } from '../type'

export const fakeString: FakeSchema<StringSchema> = (schema, fake) => {
  const description = schema.describe()
  if (description.tests.some(test => test.name === 'uuid')) {
    return random.uuid()
  }
  if (description.tests.some(test => test.name === 'email')) {
    return internet.email()
  }
  if (description.tests.some(test => test.name === 'url')) {
    return internet.url()
  }
  const regexTest = description.tests.find(test => test.name === 'matches')
  if (regexTest) {
    return randexp(regexTest.params!.regex as RegExp)
  }

  const min =
    (description.tests.find(test => test.name === 'min')?.params?.min as number) ??
    (description.tests.find(test => test.name === 'length')?.params?.length as number) ??
    undefined
  const max =
    (description.tests.find(test => test.name === 'max')?.params?.max as number) ??
    (description.tests.find(test => test.name === 'length')?.params?.length as number) ??
    undefined
  let result = (random.boolean() ? ' ' : '') + lorem.paragraph(max ?? min) + (random.boolean() ? ' ' : '')

  const shouldTrim = description.tests.some(test => test.name === 'trim')
  if (shouldTrim) {
    const trimmedStart = result.trimStart()
    const trimmedEnd = result.trimEnd()
    result =
      random.alpha({ count: result.length - trimmedStart.length }) +
      result +
      random.alpha({ count: result.length - trimmedEnd.length })
  }

  if (min !== undefined && result.length < min) {
    result = (result + random.alpha({ count: min })).slice(0, min)
  }
  if (max !== undefined && max < result.length) {
    result = (result + random.alpha({ count: max })).slice(0, max)
  }

  const lowercase =
    ((schema.tests.find(test => test.OPTIONS.name === 'string_case')?.OPTIONS.message as string)?.indexOf('lower') ??
      -1) !== -1
  const uppercase =
    ((schema.tests.find(test => test.OPTIONS.name === 'string_case')?.OPTIONS.message as string)?.indexOf('upper') ??
      -1) !== -1
  result = lowercase ? result.toLowerCase() : uppercase ? result.toUpperCase() : result

  return result
}
