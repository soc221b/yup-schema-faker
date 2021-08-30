import 'yup'

declare const __DEV__: boolean

declare module 'yup' {
  interface Schema<T, C = object> {
    tests: {
      OPTIONS: {
        name: string
        params?: Record<any, any>
      }
    }[]
    test(_: any): this
  }
}
