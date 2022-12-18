import { makeVar } from '@apollo/client'

export const favoriteLaunchesVar = makeVar<string[]>(
  JSON.parse(localStorage.getItem('favoriteLaunches')!) || []
)
