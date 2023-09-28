export const enum LocalStorageKeys {
  email = 'email',
  authToken = 'authToken',
  refreshToken = 'refreshToken',
}

export type LocalStorageValues = {
  email: string
  authToken: string
  refreshToken: string
}
