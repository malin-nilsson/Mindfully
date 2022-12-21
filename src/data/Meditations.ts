import { IMeditation } from '../models/IMeditation'
import forest from '../assets/meditations/forest.png'
import rain from '../assets/meditations/rain.png'
import waves from '../assets/meditations/waves.png'
import night from '../assets/meditations/night.png'
import boxBreathing from '../assets/meditations/box.png'
import fourSevenEight from '../assets/meditations/478.png'

export const MeditationCatalog: IMeditation[] = [
  {
    title: 'Tranquil Forest',
    tag: 'Sound Meditation',
    img: forest,
    audio: '',
    id: 23242,
  },
  {
    title: 'Box breathing',
    tag: 'Guided Breathing Meditation',
    img: boxBreathing,
    audio: '',
    id: 43202,
  },
  {
    title: 'Calm Waves',
    tag: 'Sound Meditation',
    img: waves,
    audio: '',
    id: 23243,
  },
  {
    title: 'Soft Rain',
    tag: 'Sound Meditation',
    img: rain,
    audio: '',
    id: 23244,
  },
  {
    title: '4-7-8 Breathing Technique',
    tag: 'Guided Breathing Meditation',
    img: fourSevenEight,
    audio: '',
    id: 43241,
  },
  {
    title: 'Night Ambience',
    tag: 'Sound Meditation',
    img: night,
    audio: '',
    id: 23245,
  },
]
