import { gql, useQuery } from '@apollo/client'
import { Launch, launchFilters } from '../../interfaces/launches.interface'

const GET_PAST_LAUNCHES = gql`
  query GetPastLaunches(
    $limit: Int!
    $offset: Int!
    $sort: String!
    $find: LaunchFind!
  ) {
    launchesPastResult(
      limit: $limit
      offset: $offset
      sort: $sort
      find: $find
    ) {
      data {
        mission_name
        launch_date_local
        id
        rocket {
          rocket_name
          rocket_type
        }
        launch_success
      }
      result {
        totalCount
      }
    }
  }
`

const GET_UPCOMING_LAUNCHES = gql`
  query GetUpcomingLaunches($limit: Int!, $sort: String!, $find: LaunchFind!) {
    launchesUpcoming(limit: $limit, sort: $sort, find: $find) {
      mission_name
      launch_date_local
      rocket {
        rocket_name
        rocket_type
      }
      launch_success
    }
  }
`

export const useGetPastLaunches = (
  limit: number = 200,
  offset: number = 0,
  sort: string = '',
  filter: launchFilters = {}
) => {
  return useQuery<{
    launchesPastResult: { data: Launch[]; result: { totalCount: number } }
  }>(GET_PAST_LAUNCHES, {
    variables: { limit, offset, sort, find: filter },
  })
}

export const useGetUpcomingLaunches = (
  limit: number = 200,
  sort: string = '',
  filter: launchFilters = {}
) => {
  return useQuery<{ launchesUpcoming: Launch[] }>(GET_UPCOMING_LAUNCHES, {
    variables: { limit, sort, find: filter },
  })
}
