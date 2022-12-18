import { gql, useQuery } from '@apollo/client'
import { launchDetails } from '../../interfaces/launches.interface'

const GET_LAUNCH_DETAILS = gql`
  query GetLaunchDetails($id: ID!) {
    launch(id: $id) {
      details
      links {
        wikipedia
        article_link
        flickr_images
      }
      rocket {
        rocket {
          description
          wikipedia
        }
      }
    }
  }
`

export const useGetLaunchDetails = (id: string) => {
  return useQuery<{ launch: launchDetails }>(GET_LAUNCH_DETAILS, {
    variables: { id },
  })
}
