import { createContext } from 'react'
import { IMeditation } from '../models/IMeditation'

export interface MeditationInterface {
  meditation: IMeditation
  addMeditation(m: IMeditation): void
}

export const defaultValue: MeditationInterface = {
  meditation: {
    title: '',
    tag: '',
    icon: '',
    img: '',
    audio: '',
    id: 0,
  },
  addMeditation: (m: IMeditation) => {},
}

export const MeditationContext = createContext(defaultValue)
