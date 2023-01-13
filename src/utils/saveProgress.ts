import { arrayUnion, updateDoc } from 'firebase/firestore'
import { IProgress } from '../models/IProgress'
import { getProgress } from './getProgress'
import { getUID } from './getUID'

export const saveProgress = async (meditation: IProgress) => {
  const userRef = await getUID()
  const progress = await getProgress()

  if (userRef) {
    try {
      if (progress) {
        const newProgress = arrayUnion(meditation)
        await updateDoc(userRef, {
          progress: newProgress,
        })
      } else {
        const newProgress = [meditation]
        await updateDoc(userRef, {
          progress: newProgress,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
}
