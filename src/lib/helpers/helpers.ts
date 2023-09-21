export const getEnvVariable = (name: string): string => {
  return import.meta.env[`VITE_${name}`] || ''
}
