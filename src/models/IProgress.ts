import { IMeditation } from './IMeditation'

export interface IProgress {
  meditation: IMeditation
  minutes: number
  id: number
  date: string
}
