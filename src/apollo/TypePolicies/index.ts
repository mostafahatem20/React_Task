import { TypePolicies } from '@apollo/client'
import { favoriteLaunchesVar } from '../State'

export const TypePolicy: TypePolicies = {
  Query: {
    fields: {
      favoriteLaunches: {
        read() {
          return favoriteLaunchesVar()
        },
      },
    },
  },
}
