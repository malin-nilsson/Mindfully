import { IMeditation } from './IMeditation'

export interface IProgress {
  meditation: IMeditation
  seconds: number
  id: number
  date: string
}
