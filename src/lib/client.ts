import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: '4l97qw3a',
  dataset: 'production',
  apiVersion: '2023-01-01', // use current UTC date - see "specifying API version"!
  useCdn: true, // `false` if you want to ensure fresh data
})
