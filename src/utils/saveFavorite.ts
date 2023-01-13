import { arrayUnion, updateDoc } from 'firebase/firestore'
import { IMeditation } from '../models/IMeditation'
import { getFavorites } from './getFavorites'
import { getUID } from './getUID'

export const saveFavorite = async (favorite: IMeditation) => {
  const userRef = await getUID()
  const faves = await getFavorites()

  if (userRef) {
    try {
      if (faves) {
        for (let i = 0; i < faves.length; i++) {
          // If favorite already exists in Firestore, return
          if (faves[i]._id === favorite._id) {
            return
          } // Else, add favorite to Firestore
          else {
            faves.push(favorite)
            const favorites = arrayUnion(favorite)
            await updateDoc(userRef, {
              favorites,
            })
            return faves
          }
        }

        // If favorites array is empty, create new one and update doc
        if (faves.length === 0) {
          const faves = [favorite]
          await updateDoc(userRef, {
            favorites: faves,
          })
          return faves
        }
      } else {
        // If there isn't a favorites array, create one
        const faves = [favorite]
        await updateDoc(userRef, {
          favorites: faves,
        })
        return faves
      }
    } catch (error) {
      return "Sorry, we're unable to save this favorite right now. Please try again later."
    }
  }
}
