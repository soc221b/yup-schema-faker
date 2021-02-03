import { random, internet, lorem } from 'faker'
import { randexp } from 'randexp'
import { MixedFaker } from './mixed'

import type { StringSchema } from 'yup'

export class StringFaker extends MixedFaker<StringSchema> {
  doFake() {
    const description = this.schema.describe()
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

    let min: number | undefined = undefined
    if (typeof description.tests.find(test => test.name === 'min')?.params?.min === 'number')
      min = description.tests.find(test => test.name === 'min')?.params?.min as number
    if (typeof description.tests.find(test => test.name === 'length')?.params?.length === 'number')
      min = description.tests.find(test => test.name === 'length')?.params?.length as number
    let max: number | undefined = undefined
    if (typeof description.tests.find(test => test.name === 'max')?.params?.max === 'number')
      max = description.tests.find(test => test.name === 'max')?.params?.max as number
    if (typeof description.tests.find(test => test.name === 'length')?.params?.length === 'number')
      max = description.tests.find(test => test.name === 'length')?.params?.length as number

    if (
      min === undefined &&
      this.schema.tests.some(test => test.OPTIONS.name === 'required') === false &&
      random.float({ min: 0, max: 1 }) > 0.8
    ) {
      return ''
    }

    let result = lorem
      .paragraph(max ?? min)
      .slice(0, max)
      .trim()

    const shouldTrim = this.schema.spec.strict && description.tests.some(test => test.name === 'trim')
    if (shouldTrim) {
      result = result.trim() + random.alpha({ count: result.length })
    } else {
      result = ' '.repeat(random.number(max ?? min ?? 3)) + result + ' '.repeat(random.number(max ?? min ?? 3))
    }

    result = result.slice(0, max)

    const lowercase =
      this.schema.spec.strict &&
      this.schema.tests.some(test => test.OPTIONS.name === 'string_case') &&
      this.schema.isValidSync(result.toLowerCase())
    const uppercase =
      this.schema.spec.strict &&
      this.schema.tests.some(test => test.OPTIONS.name === 'string_case') &&
      this.schema.isValidSync(result.toUpperCase())
    result = lowercase ? result.toLowerCase() : uppercase ? result.toUpperCase() : result

    return result
  }
}
