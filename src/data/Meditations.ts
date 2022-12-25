import { IMeditation } from '../models/IMeditation'
import forestIcon from '../assets/meditations/icons/forest.png'
import forestImage from '../assets/meditations/forest.jpg'
import forestSound from '../assets/meditations/audio/forest.mp3'
import rainIcon from '../assets/meditations/icons/rain.png'
import rainImage from '../assets/meditations/rain.jpg'
import rainSound from '../assets/meditations/audio/rain.mp3'
import wavesIcon from '../assets/meditations/icons/waves.png'
import wavesImage from '../assets/meditations/waves.jpg'
import wavesSound from '../assets/meditations/audio/waves.mp3'
import nightIcon from '../assets/meditations/icons/night.png'
import nightImage from '../assets/meditations/night.jpg'
import nightSound from '../assets/meditations/audio/night.mp3'
import boxBreathingIcon from '../assets/meditations/icons/box.png'
import boxBreathingImage from '../assets/meditations/box.jpg'
import fourSevenEightIcon from '../assets/meditations/icons/478.png'
import fourSevenEightImage from '../assets/meditations/478.jpg'

export const MeditationCatalog: IMeditation[] = [
  {
    title: 'Tranquil Forest',
    tag: 'Sound Meditation',
    icon: forestIcon,
    img: forestImage,
    audio: forestSound,
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
    audio: wavesSound,
    id: 23243,
  },
  {
    title: 'Soft Rain',
    tag: 'Sound Meditation',
    icon: rainIcon,
    img: rainImage,
    audio: rainSound,
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
    audio: nightSound,
    id: 23245,
  },
]
