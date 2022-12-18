export interface IUser {
  displayName: string | null
  email: string | null
  metadata: {
    creationTime?: string | undefined
  }
}
