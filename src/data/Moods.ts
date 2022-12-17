import angryFace from '../assets/moods/angry.png'
import happyFace from '../assets/moods/happy.png'
import stressedFace from '../assets/moods/stressed.png'
import sadFace from '../assets/moods/sad.png'
import worriedFace from '../assets/moods/worried.png'
import sleepyFace from '../assets/moods/sleepy.png'
import { IMood } from '../models/IMood'

export const moods: IMood[] = [
  {
    title: 'Sad',
    img: sadFace,
    id: 34565,
  },
  {
    title: 'Happy',
    img: happyFace,
    id: 34566,
  },
  {
    title: 'Stressed',
    img: stressedFace,
    id: 34567,
  },
  {
    title: 'Worried',
    img: worriedFace,
    id: 34568,
  },
  {
    title: 'Angry',
    img: angryFace,
    id: 34569,
  },
  {
    title: 'Sleepy',
    img: sleepyFace,
    id: 34579,
  },
]
