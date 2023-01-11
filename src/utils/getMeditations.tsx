import { client } from '../lib/client'
import { IMeditation } from '../models/IMeditation'

export const getMeditations = async () => {
  return client
    .fetch(
      `*[_type == "meditation"] {
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
      return data
    })
    .catch((error) => {
      return error
    })
}
