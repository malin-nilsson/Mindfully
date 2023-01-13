import { getAuth } from 'firebase/auth'
import { doc } from 'firebase/firestore'
import { db } from '../firebase/config'

// Get user reference from Firestore collection
export const getUID = () => {
  const auth = getAuth()
  if (auth.currentUser) {
    return doc(db, 'users', auth.currentUser.uid)
  }
}
