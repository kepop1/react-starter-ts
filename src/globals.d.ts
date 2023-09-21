// This shuts up TypeScript when you import a CSS module.
// Changing skipLibCheck will cause this file to error.
declare module '*.module.scss' {
  const classes: { [key: string]: string }
  export default classes
}

// ?inline catches the use of inline importing SCSS variable files with Vite
declare module '*.scss?inline' {
  const classes: { [key: string]: string }
  export default classes
}

declare module '*.svg'
