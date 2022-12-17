import { ISoundMeditation } from '../models/ISoundMeditation'
import forest from '../assets/meditations/forest.jpg'
import rain from '../assets/meditations/rain.jpg'
import beach from '../assets/meditations/beach.jpg'
import lake from '../assets/meditations/lake.jpg'

export const SoundMeditationCatalog: ISoundMeditation[] = [
  {
    title: 'Tranquil Forest',
    img: forest,
    audio: '',
    id: 23242,
  },
  {
    title: 'Calm Waves',
    img: beach,
    audio: '',
    id: 23243,
  },
  {
    title: 'Soft Rain',
    img: rain,
    audio: '',
    id: 23244,
  },
  {
    title: 'Night ambience',
    img: lake,
    audio: '',
    id: 23245,
  },
]
