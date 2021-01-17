# yup-schema-validator

Fake data generator for yup

# Playground

https://g33ze.sse.codesandbox.io/

# Usage

```typescript
import * as yup from 'yup'
import { fake } from 'yup-schema-faker'

const schema = object()
  .required()
  .noUnknown()
  .shape({
    name: string().required().min(4).max(20),
    age: number().required().min(18).max(100).positive().integer(),
    email: string().email(),
    website: string().url(),
    createdOn: date().default(function () {
      return new Date()
    }),
  })

const fakeData = fake(schema)

console.log(fakeData)
/*
  {
    name: ' Assumenda eos volup',
    age: 53,
    email: 'Tatyana75@hotmail.com',
    website: 'https://ike.info',
    createdOn: '2003-12-22T20:52:08.501Z'
  }
*/
```

# Add `fake` Method to Schema

**Step 1. Augment the yup module**

```typescript
declare module 'yup' {
  interface BaseSchema {
    fake(): any
  }
}
```

**Step 2. Add the method**

```typescript
import { mixed } from 'yup'
import { fake } from 'yup-schema-faker'

addMethod(mixed, 'fake', function () {
  return fake(this)
})
```

**Step 3. Use it!**

```typescript
const booleanSchema = boolean().required()
booleanSchema.fake()
```

# Supported yup API

- yup
  - ✅ yup.ref(path: string, options: { contextPrefix: string }): Ref
  - ✅ yup.lazy((value: any) => Schema): Lazy
- mixed
  - ? mixed.concat(schema: Schema): Schema
  - ? mixed.cast(value: any, options = {}): any
  - ? mixed.strip(stripField: boolean = true): Schema
  - ? mixed.withMutation(builder: (current: Schema) => void): void
  - ✅ mixed.default(value: any): Schema
  - ? mixed.nullable(isNullable: boolean = true): Schema
  - ✅ mixed.required(message?: string | function): Schema
  - ✅ mixed.notRequired(): Schema Alias: optional()
  - ? mixed.defined(): Schema
  - ✅ mixed.oneOf(arrayOfValues: Array<any>, message?: string | function): Schema Alias: equals
  - ? mixed.notOneOf(arrayOfValues: Array<any>, message?: string | function)
  - ? mixed.when(keys: string | Array<string>, builder: object | (value, schema)=> Schema): Schema
  - ? mixed.transform((currentValue: any, originalValue: any) => any): Schema
- string
  - ✅ string.required(message?: string | function): Schema
  - ✅ string.length(limit: number | Ref, message?: string | function): Schema
  - ✅ string.min(limit: number | Ref, message?: string | function): Schema
  - ✅ string.max(limit: number | Ref, message?: string | function): Schema
  - ✅ string.matches(regex: Regex, message?: string | function): Schema
  - ? string.matches(regex: Regex, options: { message: string, excludeEmptyString: bool }): Schema
  - ✅ string.email(message?: string | function): Schema
  - ✅ string.url(message?: string | function): Schema
  - ✅ string.uuid(message?: string | function): Schema
  - ? string.ensure(): Schema
  - ✅ string.trim(message?: string | function): Schema
  - ⚠ string.lowercase(message?: string | function): Schema
    > only support for default message (locale:es) currently
  - ⚠ string.uppercase(message?: string | function): Schema
    > only support for default message (locale:es) currently
- number
  - ✅ number.min(limit: number | Ref, message?: string | function): Schema
  - ✅ number.max(limit: number | Ref, message?: string | function): Schema
  - ⚠ number.lessThan(max: number | Ref, message?: string | function): Schema
    > offset by 0.01 currently
  - ⚠ number.moreThan(min: number | Ref, message?: string | function): Schema
    > offset by 0.01 currently
  - ⚠ number.positive(message?: string | function): Schema
    > offset by 0.01 currently
  - ⚠ number.negative(message?: string | function): Schema
    > offset by 0.01 currently
  - ✅ number.integer(message?: string | function): Schema
  - ? number.truncate(): Schema
  - ? number.round(type: 'floor' | 'ceil' | 'trunc' | 'round' = 'round'): Schema
- boolean
- date
  - ✅ date.min(limit: Date | string | Ref, message?: string | function): Schema
  - ✅ date.max(limit: Date | string | Ref, message?: string | function): Schema
- array
  - ✅ array.of(type: Schema): Schema
  - ✅ array.length(length: number | Ref, message?: string | function): Schema
  - ✅ array.min(limit: number | Ref, message?: string | function): Schema
  - ✅ array.max(limit: number | Ref, message?: string | function): Schema
  - ? array.ensure(): Schema
  - ? array.compact(rejector: (value) => boolean): Schema
- object
  - ? Object schema defaults
  - ✅ object.shape(fields: object, noSortEdges?: Array<[string, string]>): Schema
  - ? object.pick(keys: string[]): Schema
  - ? object.omit(keys: string[]): Schema
  - ? object.from(fromKey: string, toKey: string, alias: boolean = false): this
  - ✅ object.noUnknown(onlyKnownKeys: boolean = true, message?: string | function): Schema
  - ? object.camelCase(): Schema
  - ? object.constantCase(): Schema
