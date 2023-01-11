export interface IUser {
  id: string | null
  firstName: string | null
  email: string | null
  metadata: {
    creationTime?: string | undefined
  }
}
