# yup-schema-faker

[![npm](https://img.shields.io/npm/v/yup-schema-faker)](https://www.npmjs.com/package/yup-schema-faker)
[![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/iendeavor/yup-schema-faker/CI/main)](https://github.com/iendeavor/yup-schema-faker/actions?query=workflow%3ACI+branch%3Amain+)
![Codecov branch](https://img.shields.io/codecov/c/github/iendeavor/yup-schema-faker/develop)
![npm downloads](https://img.shields.io/npm/dm/yup-schema-faker)
![last commit](https://img.shields.io/github/last-commit/iendeavor/yup-schema-faker/main)
[![donate](https://img.shields.io/badge/buy%20me%20a%20coffee-donate-orange)](https://www.paypal.com/paypalme/iendeavor)

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

# API

## `fake`

Pass a yup schema and return a fake data.

Function signature:

```typescript
interface Options {
  // see: https://github.com/jquense/yup#mixedwhenkeys-string--arraystring-builder-object--value-schema-schema-schema
  context?: object
}

function fake<Schema etends AnySchema>(schema: Schema, options?: Options): ReturnType<Schema['cast']>;
```

Example:

See [usage](#usage)

# Extending Faker

## Fake extended methods

Similar to `yup.addMethod`, `yup-schema-faker` provides a `fakeDedicatedTest` method to fake extending method for a
schema.

Function signature:

```typescript
function fakeDedicatedTest<Schema extends AnySchema>(
  schemaConstructor: (...arg: any[]) => Schema,
  name: string,
  fakeFn: (currentSchema: Schema) => any,
)
```

For Example:

See [`string.json` example](./site/src/views/Custom/string-json.ts)

## Fake extended schemas

`yup-schema-faker` also provides a `addFaker` method, which gives you the ability to extend faker for custom schema or
overide existing one.

Function signature:

```typescript
function addFaker<Schema extends AnySchema, Faker>(
  schemaConstructor: (...arg: any[]) => Schema,
  fakerConstructor: Faker,
)
```

For example:

See [customMixed example](./site/src/views/Custom/custom-mixed.ts)

# Setting a randomness seed

If you want to produce consistent results, you can set your own seed with integer:

```javascript
import { seed, fake } from 'yup-schema-faker'
import { string } from 'yup'

seed(123)
const firstRandom = fake(string())

seed(123)
const secondRandom = fake(string())

console.log(firstRandom === secondRandom) // true
```

# TypeScript support

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
    > generate trimmed string iff in strict mode
  - ✅ string.lowercase(message?: string | function): Schema
    > generate lowercase string iff in strict mode
  - ✅ string.uppercase(message?: string | function): Schema
    > generate uppercase string iff in strict mode
- number
  - ✅ number.min(limit: number | Ref, message?: string | function): Schema
  - ✅ number.max(limit: number | Ref, message?: string | function): Schema
  - ✅ number.lessThan(max: number | Ref, message?: string | function): Schema
  - ✅ number.moreThan(min: number | Ref, message?: string | function): Schema
  - ✅ number.positive(message?: string | function): Schema
  - ✅ number.negative(message?: string | function): Schema
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
    > fake function will generate unknown fields, unless in strict mode

# Contributing

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

People _love_ thorough bug reports. I'm not even kidding.

## Report bugs using Github's [issues](../../issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](../../issues/new); it's that easy!

## Write bug reports with detail, background, and sample code

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can.
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)
