import { client } from '../lib/client'
import { IMeditation } from '../models/IMeditation'

export const getSpecificMeditation = async (meditationTitle: string) => {
  return client
    .fetch(
      `*[title == "${meditationTitle}"]{
    title,
    tag,
    name,
    description,
    breatheTime,
    holdTime,
    totalTime,
    _id,
    _type,
    video {
      asset -> {
        url,
        _id
      }
    },
    audio {
      asset -> {
        url,
        _id
      }
    },
    icon {
      asset -> {
        url,
        _id
      }
    },
    image {
      asset -> {
        url,
        _id
      }
    },
  }`,
    )
    .then((data: IMeditation[]) => {
      return data[0]
    })
    .catch((error) => {
      return error
    })
}
