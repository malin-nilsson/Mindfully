import { IMeditation } from '../models/IMeditation'
import forestIcon from '../assets/meditations/forest.png'
import forestImage from '../assets/meditations/forest.jpg'
import rainIcon from '../assets/meditations/rain.png'
import rainImage from '../assets/meditations/rain.jpg'
import wavesIcon from '../assets/meditations/waves.png'
import wavesImage from '../assets/meditations/waves.jpg'
import nightIcon from '../assets/meditations/night.png'
import nightImage from '../assets/meditations/night.jpg'
import boxBreathingIcon from '../assets/meditations/box.png'
import boxBreathingImage from '../assets/meditations/box.jpg'
import fourSevenEightIcon from '../assets/meditations/478.png'
import fourSevenEightImage from '../assets/meditations/478.jpg'

export const MeditationCatalog: IMeditation[] = [
  {
    title: 'Tranquil Forest',
    tag: 'Sound Meditation',
    icon: forestIcon,
    img: forestImage,
    audio: '',
    id: 23242,
  },
  {
    title: 'Box breathing',
    tag: 'Guided Breathing Meditation',
    icon: boxBreathingIcon,
    img: boxBreathingImage,
    audio: '',
    id: 43202,
  },
  {
    title: 'Calm Waves',
    tag: 'Sound Meditation',
    icon: wavesIcon,
    img: wavesImage,
    audio: '',
    id: 23243,
  },
  {
    title: 'Soft Rain',
    tag: 'Sound Meditation',
    icon: rainIcon,
    img: rainImage,
    audio: '',
    id: 23244,
  },
  {
    title: '4-7-8 Breathing Technique',
    tag: 'Guided Breathing Meditation',
    icon: fourSevenEightIcon,
    img: fourSevenEightImage,
    audio: '',
    id: 43241,
  },
  {
    title: 'Night Ambience',
    tag: 'Sound Meditation',
    icon: nightIcon,
    img: nightImage,
    audio: '',
    id: 23245,
  },
]
