import { AnySchema, MixedSchema } from 'yup'
import { addFaker, fake, MixedFaker } from '../../src'
import { date } from 'faker'
import { MixedLocale } from 'yup/lib/locale'

interface ISODateStringSchema {
  defined(msg?: MixedLocale['defined']): ISODateStringSchema
}

class ISODateStringSchema extends MixedSchema {
  iso() {
    return this.test({
      name: 'iso',
      message: `Date String must be iso string`,
      exclusive: true,
      test(isoDateString: any) {
        if (typeof isoDateString !== 'string') return true
        return new Date(isoDateString).toISOString() === isoDateString
      },
    })
  }

  min(min: string) {
    return this.test({
      name: 'min',
      message: '${path} field must be earlier than ${min}',
      params: {
        min,
      },
      exclusive: true,
      test(isoDateString: any) {
        return +new Date(min) <= +new Date(isoDateString)
      },
    })
  }

  max(max: string) {
    return this.test({
      name: 'max',
      message: '${path} field must be later than',
      params: {
        max,
      },
      exclusive: true,
      test(isoDateString: any) {
        return +new Date(isoDateString) <= +new Date(max)
      },
    })
  }
}
function isoDateString() {
  return new ISODateStringSchema()
}
isoDateString.prototype = ISODateStringSchema.prototype

class ISODateStringFaker extends MixedFaker<AnySchema> {
  doFake() {
    const min =
      (this.schema.tests.find(test => test.OPTIONS.name === 'min')?.OPTIONS.params?.min as string | undefined) ??
      '2000-01-01T00:00:00.000Z'
    const max =
      (this.schema.tests.find(test => test.OPTIONS.name === 'max')?.OPTIONS.params?.max as string | undefined) ??
      '2020-01-01T00:00:00.000Z'
    return date.between(min, max).toISOString()
  }
}

addFaker(isoDateString, ISODateStringFaker)

it('should be a valid schema constructor', () => {
  const date = new Date('2000-01-01T00:00:00.001Z')
  const less = new Date(date)
  less.setMilliseconds(0)
  const more = new Date(date)
  more.setMilliseconds(2)

  const schema = isoDateString().defined().iso().min(less.toISOString()).max(more.toISOString())
  const actual = fake(schema)
  expect(schema.isValidSync(actual)).toBe(true)
  expect(typeof actual).toBe('string')
})
