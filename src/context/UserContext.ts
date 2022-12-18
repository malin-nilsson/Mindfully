import { createContext } from 'react'
import { IUser } from '../models/IUser'

export interface UserInterface {
  user: IUser
}

export const defaultValue: UserInterface = {
  user: {
    displayName: '',
    email: '',
    metadata: {
      creationTime: '',
    },
  },
}

export const UserContext = createContext(defaultValue)
