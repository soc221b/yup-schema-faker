# yup-schema-faker

[![npm](https://img.shields.io/npm/v/yup-schema-faker)](https://www.npmjs.com/package/yup-schema-faker)
[![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/iendeavor/yup-schema-faker/CI/main)](https://github.com/iendeavor/yup-schema-faker/actions?query=workflow%3ACI+branch%3Amain+)
![npm downloads](https://img.shields.io/npm/dm/yup-schema-faker)
![last commit](https://img.shields.io/github/last-commit/iendeavor/yup-schema-faker/main)

Fake data generator for yup

# Demo and Playground

https://iendeavor.github.io/yup-schema-faker/

# Usage

```typescript
import * as yup from 'yup'
import { fake } from 'yup-schema-faker'

const schema = yup
  .object()
  .required()
  .noUnknown()
  .shape({
    name: yup.string().required().min(4).max(20),
    age: yup.number().required().min(18).max(100).positive().integer(),
    email: yup.string().email(),
    website: yup.string().url(),
    createdOn: yup.date().default(function () {
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
import { AnySchema } from 'yup'
import { Fake } from 'yup-schema-faker'

declare module 'yup' {
  interface BaseSchema {
    fake<Schema extends AnySchema>(this: Schema): ReturnType<Fake<Schema>>
  }
}
```

**Step 2. Add the method**

```typescript
import { addMethod, mixed } from 'yup'
import { fake } from 'yup-schema-faker'

addMethod(mixed, 'fake', function () {
  return fake(this)
})
```

**Step 3. Use it!**

```typescript
import { boolean } from 'yup'

const booleanSchema = boolean().required()
const data = booleanSchema.fake() // boolean
```

# Supported yup API

- yup
  - ✅ yup.ref(path: string, options: { contextPrefix: string }): Ref
  - ✅ yup.lazy((value: any) => Schema): Lazy
- mixed
  - ✅ mixed.default(value: any): Schema
  - ✅ mixed.nullable(isNullable: boolean = true): Schema
  - ✅ mixed.required(message?: string | function): Schema
  - ✅ mixed.notRequired(): Schema Alias: optional()
  - ✅ mixed.defined(): Schema
  - ✅ mixed.oneOf(arrayOfValues: Array<any>, message?: string | function): Schema Alias: equals
  - ✅ mixed.notOneOf(arrayOfValues: Array<any>, message?: string | function)
  - ✅ mixed.when(keys: string | Array<string>, builder: object | (value, schema)=> Schema): Schema
- string
  - ✅ string.required(message?: string | function): Schema
  - ✅ string.length(limit: number | Ref, message?: string | function): Schema
  - ✅ string.min(limit: number | Ref, message?: string | function): Schema
  - ✅ string.max(limit: number | Ref, message?: string | function): Schema
  - ✅ string.matches(regex: Regex, message?: string | function): Schema
  - ❌ string.matches(regex: Regex, options: { message: string, excludeEmptyString: bool }): Schema
    > this feature cannot be detected, use another schema to achieve this behavior
  - ✅ string.email(message?: string | function): Schema
  - ✅ string.url(message?: string | function): Schema
  - ✅ string.uuid(message?: string | function): Schema
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
- boolean
  - ✅ boolean.isTrue(message?: string | function): Schema
  - ✅ boolean.isFalse(message?: string | function): Schema
- date
  - ✅ date.min(limit: Date | string | Ref, message?: string | function): Schema
  - ✅ date.max(limit: Date | string | Ref, message?: string | function): Schema
- array
  - ✅ array.of(type: Schema): Schema
  - ✅ array.length(length: number | Ref, message?: string | function): Schema
  - ✅ array.min(limit: number | Ref, message?: string | function): Schema
  - ✅ array.max(limit: number | Ref, message?: string | function): Schema
- object
  - ✅ object.shape(fields: object, noSortEdges?: Array<[string, string]>): Schema
  - ✅ object.noUnknown(onlyKnownKeys: boolean = true, message?: string | function): Schema
