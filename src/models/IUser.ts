export interface IUser {
  id: string | null
  displayName: string | null
  email: string | null
  metadata: {
    creationTime?: string | undefined
  }
}
