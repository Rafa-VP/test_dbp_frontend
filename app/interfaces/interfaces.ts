export interface IUser {
  accessToken: string
  username: string
}

export interface IClient {
  _id?: string
  ci: string
  firstName: string
  lastName: string
  sugarPercent: number
  fatPercent: number
  oxygenPercent: number
  createAt?: string
  updateAt?: string
}
