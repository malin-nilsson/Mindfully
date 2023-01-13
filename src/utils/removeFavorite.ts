import { updateDoc } from 'firebase/firestore'
import { IMeditation } from '../models/IMeditation'
import { getFavorites } from './getFavorites'
import { getUID } from './getUID'

export const removeFavorite = async (m: IMeditation) => {
  const userRef = await getUID()
  const faves = await getFavorites()

  if (userRef) {
    try {
      if (faves) {
        for (let i = 0; i < faves.length; i++) {
          if (faves[i]._id === m._id) {
            faves.splice(i, 1)
            await updateDoc(userRef, {
              favorites: faves,
            })
            return faves
          }
        }
      }
    } catch (error) {
      return "Sorry, we can't remove this favorite right now. Please try again later."
    }
  }
}
