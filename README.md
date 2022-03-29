# Yup-schema-faker

> Yup-schema-faker will generate you a fake data based on your [yup](https://github.com/jquense/yup) schema.

[Showcase & Playground](https://iendeavor.github.io/yup-schema-faker/)

[![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/iendeavor/yup-schema-faker/CI/main)](https://github.com/iendeavor/yup-schema-faker/actions?query=workflow%3ACI+branch%3Amain+)
[![codecov](https://codecov.io/gh/iendeavor/yup-schema-faker/branch/develop/graph/badge.svg?token=OP3HU6QW90)](https://codecov.io/gh/iendeavor/yup-schema-faker)
![last commit](https://img.shields.io/github/last-commit/iendeavor/yup-schema-faker/main)

Key features:

- Easy to use: minimal setup and API.
- Extensible: Add fakers for your own schemas, methods or override existing ones.

## Version Compatibiility

| yup                                                                  | @types/yup                                          | yup-schema-faker                                                      |
| -------------------------------------------------------------------- | --------------------------------------------------- | --------------------------------------------------------------------- |
| [~0.28.x](https://github.com/jquense/yup/tree/v0.28.5)               | [~0.28.x](https://www.npmjs.com/package/@types/yup) | [~2.28.x](https://github.com/iendeavor/yup-schema-faker/tree/v2.28.x) |
| [~0.29.x](https://github.com/jquense/yup/tree/v0.29.3)               | [~0.29.x](https://www.npmjs.com/package/@types/yup) | [~2.29.x](https://github.com/iendeavor/yup-schema-faker/tree/v2.29.x) |
| [>= 0.32.0, <= 0.32.10](https://github.com/jquense/yup/tree/v0.32.9) | N/A                                                 | [~2.32.x](https://github.com/iendeavor/yup-schema-faker/tree/v2.32.x) |
| [>= 0.32.11](https://github.com/jquense/yup/tree/v0.32.11)           | N/A                                                 | main                                                                  |

## Getting Started

Install `yup-schema-faker` and its peer dependencies with your favorite package manager:

```sh
pnpm add yup@^0.32.11
pnpm add -D yup-schema-faker@^3.0.0
pnpm add -D @faker-js/faker@^6.0.0
pnpm add -D randexp@^0.5.3
```

Before using it, you need to install the built-in fakers:

```typescript
import { install } from 'yup-schema-faker'

// You probably only want to use it in development mode.
if (process.env.NODE_ENV === 'development') {
  install()

  // If you have custom fakers, you will need to install them here, too.

  // 1. to fake extended schema (or override existing ones):
  // addFaker(boolean, BooleanFaker)

  // 2. to fake extended schema methods (or override existing ones):
  // fakeDedicatedTest(boolean, 'is-value', schema => {
  //   const isValueTest = schema.tests.find(test => test.OPTIONS.name === 'is-value')!
  //   return isValueTest.OPTIONS.params?.value === 'true'
  // })
}
```

And then you can use it:

```typescript
import * as yup from 'yup'
import { fake } from 'yup-schema-faker'

// write a schema
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

// generate a fake data
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

## API

### `fake`

Pass a yup schema and return a fake data.

Function signature:

```typescript
interface Options {
  // see: https://github.com/jquense/yup#mixedwhenkeys-string--arraystring-builder-object--value-schema-schema-schema
  context?: object
  // see: https://github.com/jquense/yup#mixedvalidatevalue-any-options-object-promiseany-validationerror
  strict?: boolean
}

function fake<Schema etends AnySchema>(schema: Schema, options?: Options): ReturnType<Schema['cast']>;
```

Example:

See [usage](#usage)

## Extending Faker

### Fake extended methods

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

### Fake extended schemas

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

## Setting a randomness seed

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

## Supported yup API

- yup
  - ✅ yup.ref(path: string, options: { contextPrefix: string }): Ref
  - ✅ yup.lazy((value: any) => Schema): Lazy
- mixed
  - ✅ mixed.strict(isStrict: boolean = false): Schema
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

## Contributing

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

People _love_ thorough bug reports. I'm not even kidding.

### Report bugs using Github's [issues](../../issues)

We use GitHub issues to track public bugs. Report a bug by [opening a new issue](../../issues/new); it's that easy!

### Write bug reports with detail, background, and sample code

**Great Bug Reports** tend to have:

- A quick summary and/or background
- Steps to reproduce
  - Be specific!
  - Give sample code if you can.
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## Support Me

[![paypal](https://img.shields.io/badge/donate-paypal-blue)](https://www.paypal.com/paypalme/iendeavor)
[![buymeacoffee](https://img.shields.io/badge/donate-buymeacoffee-blue)](https://www.buymeacoffee.com/iendeavor)
