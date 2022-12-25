import { getAuth } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { IMeditation } from '../models/IMeditation'

// Get user's favorites
export const getFavorites = async () => {
  const auth = getAuth()

  if (auth.currentUser) {
    // Get user from "Users" collection
    const userRef = doc(db, 'users', auth.currentUser.uid)
    try {
      // Get docs for user
      const docSnap = await getDoc(userRef)
      if (docSnap.exists()) {
        // Get user favorites
        const faves: IMeditation[] = docSnap.data().favorites
        if (faves) {
          return faves
        }
      } else {
        return
      }
    } catch (error) {
      console.log(error)
    }
  }
}
