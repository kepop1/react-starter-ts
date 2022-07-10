// This shuts up TypeScript when you import a CSS module.
declare module '*.module.scss' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.scss' {
  const classes: { [key: string]: string }
  export default classes
}
