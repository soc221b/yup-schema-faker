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
      Math.random() > 0.8
    ) {
      return ''
    }
    let result = (random.boolean() ? ' ' : '') + lorem.sentence(max ?? min) + (random.boolean() ? ' ' : '')

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
      ((this.schema.tests.find(test => test.OPTIONS.name === 'string_case')?.OPTIONS.message as string)?.indexOf(
        'lower',
      ) ?? -1) !== -1
    const uppercase =
      ((this.schema.tests.find(test => test.OPTIONS.name === 'string_case')?.OPTIONS.message as string)?.indexOf(
        'upper',
      ) ?? -1) !== -1
    result = lowercase ? result.toLowerCase() : uppercase ? result.toUpperCase() : result

    return result
  }
}
