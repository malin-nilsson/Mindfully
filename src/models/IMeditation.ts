export interface IMeditation {
  title: string
  tag: string
  icon: SanityObject
  image?: SanityObject
  audio?: SanityObject
  video?: SanityObject
  description?: string
  _id: string
  totalTime?: number
  holdTime?: number
  breatheTime?: number
}

interface SanityObject {
  asset: Asset
}

interface Asset {
  url: string
  _id: string
}
