import { getAuth } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

// Get user's favorites
export const getProgress = async () => {
  const auth = getAuth()

  if (auth.currentUser) {
    // Get user from "Users" collection
    const userRef = doc(db, 'users', auth.currentUser.uid)
    try {
      // Get docs for user
      const docSnap = await getDoc(userRef)
      if (docSnap.exists()) {
        // Get user progress
        const progress = docSnap.data().progress

        if (progress) {
          return progress
        }
      } else {
        return
      }
    } catch (error) {
      console.log(error)
    }
  }
}
